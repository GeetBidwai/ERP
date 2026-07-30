from decimal import Decimal

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from businesses.models import Business
from inventory.models import Inventory
from sales.models import Sale, SaleItem
from suppliers.models import Supplier


class DashboardViewTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username="dashboard-user", password="password")
        self.business = Business.objects.create(name="Dashboard Store", business_type="grain")
        product = Inventory.objects.create(business=self.business, product_name="Gehu", product_type="Gehu", bag_size=Decimal("30"), purchase_price=Decimal("30"), selling_price=Decimal("40"), opening_stock=8, remaining_bags=4)
        Supplier.objects.create(business=self.business, supplier_name="Acme Traders", phone="9876543210")
        sale = Sale.objects.create(business=self.business, invoice_number="INV-000001", payment_mode="Cash", total_amount=Decimal("1200"))
        SaleItem.objects.create(sale=sale, product=product, quantity=1, selling_price=Decimal("1200"), subtotal=Decimal("1200"))
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_dashboard_aggregates_business_data(self):
        response = self.client.get("/api/dashboard/", {"business": self.business.id})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["total_products"], 1)
        self.assertEqual(response.data["total_suppliers"], 1)
        self.assertEqual(response.data["today_invoice_count"], 1)
        self.assertEqual(response.data["low_stock_products"][0]["product_name"], "Gehu")
        self.assertEqual(response.data["top_selling_products"][0]["quantity"], 1)
