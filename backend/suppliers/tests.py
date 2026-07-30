from django.test import TestCase

from businesses.models import Business

from .serializers import SupplierSerializer


class SupplierSerializerTests(TestCase):
    def setUp(self):
        self.business = Business.objects.create(name="Test Grain Store", business_type="grain")

    def test_supplier_name_must_be_unique_within_a_business(self):
        data = {"business": self.business.id, "supplier_name": "Acme Traders", "phone": "9876543210"}
        serializer = SupplierSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        serializer.save()

        duplicate = SupplierSerializer(data={**data, "supplier_name": "acme traders"})
        self.assertFalse(duplicate.is_valid())
        self.assertIn("supplier_name", duplicate.errors)

    def test_supplier_requires_a_valid_phone_and_gst_number(self):
        serializer = SupplierSerializer(data={
            "business": self.business.id,
            "supplier_name": "Acme Traders",
            "phone": "123",
            "gst_number": "invalid",
        })

        self.assertFalse(serializer.is_valid())
        self.assertIn("phone", serializer.errors)
        self.assertIn("gst_number", serializer.errors)
