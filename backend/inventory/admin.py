from django.contrib import admin
from .models import Inventory


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = (
        "product_name",
        "business",
        "product_type",
        "remaining_bags",
        "status",
    )

    list_filter = (
        "business",
        "product_type",
        "status",
    )

    search_fields = (
        "product_name",
    )