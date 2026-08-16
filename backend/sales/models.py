from django.db import models

from businesses.models import Business
from inventory.models import Inventory


class Sale(models.Model):
    PAYMENT_MODE_CHOICES = [
        ("Cash", "Cash"),
        ("UPI", "UPI"),
        ("Bank Transfer", "Bank Transfer"),
    ]

    business = models.ForeignKey(
        Business,
        on_delete=models.CASCADE,
        related_name="sales",
    )
    invoice_number = models.CharField(max_length=20, unique=True, editable=False)
    customer_name = models.CharField(max_length=200, default="Walk-in Customer")
    sale_date = models.DateField(auto_now_add=True)
    sale_time = models.TimeField(auto_now_add=True)
    payment_mode = models.CharField(max_length=20, choices=PAYMENT_MODE_CHOICES)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    remarks = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-sale_date", "-sale_time"]

    def __str__(self):
        return f"Sale #{self.pk} - {self.business}"


class SaleItem(models.Model):
    sale = models.ForeignKey(
        Sale,
        on_delete=models.CASCADE,
        related_name="items",
    )
    product = models.ForeignKey(
        Inventory,
        on_delete=models.CASCADE,
        related_name="sale_items",
    )
    quantity = models.DecimalField(max_digits=10,decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.product} x {self.quantity}"
