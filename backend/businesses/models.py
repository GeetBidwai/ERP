from django.db import models


class Business(models.Model):
    BUSINESS_TYPES = [
        ("grain", "Grain Store"),
        ("scrap", "Scrap Merchant"),
        ("centering", "Centering"),
    ]

    name = models.CharField(max_length=100)
    business_type = models.CharField(max_length=20, choices=BUSINESS_TYPES)
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name