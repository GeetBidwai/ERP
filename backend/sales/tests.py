from decimal import Decimal

from django.test import TestCase

from businesses.models import Business
from inventory.models import Inventory

from .serializers import SaleSerializer


class SaleSerializerTests(TestCase):
    def setUp(self):
        self.business = Business.objects.create(name="Test Grain Store", business_type="grain")
        self.inventory = Inventory.objects.create(
            business=self.business,
            product_name="Gehu",
            product_type="Gehu",
            bag_size=Decimal("30"),
            purchase_price=Decimal("30"),
            selling_price=Decimal("40"),
            opening_stock=10,
            remaining_bags=10,
        )

    def test_sale_creation_generates_invoice_total_and_deducts_stock(self):
        serializer = SaleSerializer(data={
            "business": self.business.id,
            "payment_mode": "Cash",
            "items": [{
                "product": self.inventory.id,
                "quantity": 3,
                "selling_price": "1200.00",
            }],
        })

        self.assertTrue(serializer.is_valid(), serializer.errors)
        sale = serializer.save()

        self.inventory.refresh_from_db()
        self.assertEqual(sale.invoice_number, "INV-000001")
        self.assertEqual(sale.total_amount, Decimal("3600.00"))
        self.assertEqual(self.inventory.remaining_bags, 7)
        self.assertEqual(sale.items.count(), 1)
