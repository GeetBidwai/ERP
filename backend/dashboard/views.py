from datetime import timedelta

from django.db.models import Sum
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from inventory.models import Inventory
from sales.models import Sale, SaleItem
from suppliers.models import Supplier


class DashboardView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        business_id = request.query_params.get("business")
        if not business_id:
            return Response({"detail": "A business query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        today = timezone.localdate()
        week_start = today - timedelta(days=6)
        sales_queryset = Sale.objects.filter(business_id=business_id)
        today_sales = sales_queryset.filter(sale_date=today).aggregate(total=Sum("total_amount"))
        weekly_totals = {
            row["sale_date"]: row["total"]
            for row in sales_queryset.filter(sale_date__range=(week_start, today)).values("sale_date").annotate(total=Sum("total_amount"))
        }

        return Response({
            "today_sales": today_sales["total"] or 0,
            "today_invoice_count": sales_queryset.filter(sale_date=today).count(),
            "total_products": Inventory.objects.filter(business_id=business_id).count(),
            "total_suppliers": Supplier.objects.filter(business_id=business_id).count(),
            "low_stock_products": list(Inventory.objects.filter(business_id=business_id, remaining_bags__lte=10).order_by("remaining_bags").values("id", "product_name", "remaining_bags", "bag_size")[:5]),
            "recent_sales": list(sales_queryset.order_by("-sale_date", "-sale_time").values("id", "invoice_number", "customer_name", "sale_date", "sale_time", "payment_mode", "total_amount")[:5]),
            "weekly_sales": [
                {"date": (week_start + timedelta(days=offset)).isoformat(), "total": weekly_totals.get(week_start + timedelta(days=offset), 0)}
                for offset in range(7)
            ],
            "top_selling_products": list(SaleItem.objects.filter(sale__business_id=business_id).values("product_id", "product__product_name").annotate(quantity=Sum("quantity"), total=Sum("subtotal")).order_by("-quantity", "product__product_name")[:5]),
        })
