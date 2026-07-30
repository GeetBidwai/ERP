from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Supplier
from .serializers import SupplierSerializer


class SupplierViewSet(viewsets.ModelViewSet):
    serializer_class = SupplierSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Supplier.objects.select_related("business").all()

    def get_queryset(self):
        queryset = super().get_queryset()
        business_id = self.request.query_params.get("business")
        return queryset.filter(business_id=business_id) if business_id else queryset
