from django.db import models
from businesses.models import Business


class Inventory(models.Model):
    PRODUCT_TYPES = [
        ("Gehu", "Gehu"),
        ("Bajra", "Bajra"),
        ("Jowar", "Jowar"),
        ("Rice", "Rice"),
        ("Raire", "Raire"),
    ]

    STATUS_CHOICES = [
        ("Active", "Active"),
        ("Inactive", "Inactive"),
    ]

    business = models.ForeignKey(
        Business,
        on_delete=models.CASCADE,
        related_name="inventory_items"
    )

    product_name = models.CharField(max_length=200)

    product_type = models.CharField(
        max_length=50,
        choices=PRODUCT_TYPES
    )

    bag_size = models.DecimalField(
        max_digits=6,
        decimal_places=2
    )

    purchase_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    selling_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    opening_stock = models.PositiveIntegerField()

    remaining_bags = models.PositiveIntegerField()

    description = models.TextField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Active"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_weight(self):
        return self.bag_size * self.remaining_bags

    def __str__(self):
        return self.product_name