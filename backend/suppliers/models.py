from django.db import models

from businesses.models import Business


class Supplier(models.Model):
    STATUS_CHOICES = (("Active", "Active"), ("Inactive", "Inactive"))

    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="suppliers")
    supplier_name = models.CharField(max_length=200)
    contact_person = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=15)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    gst_number = models.CharField(max_length=15, blank=True)
    opening_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    payment_terms = models.CharField(max_length=200, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Active")
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("supplier_name",)
        constraints = [models.UniqueConstraint(fields=("business", "supplier_name"), name="unique_supplier_name_per_business")]

    def __str__(self):
        return self.supplier_name
