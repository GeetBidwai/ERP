from django.contrib import admin

from .models import Supplier


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ("supplier_name", "business", "phone", "city", "status")
    list_filter = ("business", "status", "state")
    search_fields = ("supplier_name", "phone", "gst_number")
