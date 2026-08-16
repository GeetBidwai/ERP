from decimal import ROUND_FLOOR

from django.db import transaction
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Sale
from .serializers import SaleListSerializer, SaleSerializer


class SaleViewSet(viewsets.ModelViewSet):
    serializer_class = SaleSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Sale.objects.select_related("business").all()

    def get_serializer_class(self):
        return SaleListSerializer if self.action == "history" else SaleSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        business_id = self.request.query_params.get("business")
        queryset = (
            queryset.filter(business_id=business_id)
            if business_id
            else queryset
        )
        return (
            queryset.prefetch_related("items__product")
            if self.action == "retrieve"
            else queryset
        )

    @action(detail=False, methods=("get",))
    def history(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def perform_destroy(self, instance):
        with transaction.atomic():
            for item in instance.items.select_related("product").select_for_update():
                product = item.product

                # Restore the sold kilograms to loose stock.
                product.loose_stock_kg += item.quantity

                # Convert every complete bag's worth of loose stock
                # back into an unopened bag.
                bags_to_close = (
                    product.loose_stock_kg / product.bag_size
                ).to_integral_value(rounding=ROUND_FLOOR)

                bags_to_close = int(bags_to_close)

                product.remaining_bags += bags_to_close

                product.loose_stock_kg -= (
                    product.bag_size * bags_to_close
                )

                product.save(
                    update_fields=(
                        "remaining_bags",
                        "loose_stock_kg",
                        "updated_at",
                    )
                )

            instance.delete()