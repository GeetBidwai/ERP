from django.contrib import admin

from .models import Sale, SaleItem


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ("id", "business", "sale_date", "sale_time", "payment_mode", "total_amount")
    list_filter = ("business", "payment_mode", "sale_date")
    search_fields = ("business__name",)


@admin.register(SaleItem)
class SaleItemAdmin(admin.ModelAdmin):
    list_display = ("sale", "product", "quantity", "selling_price", "subtotal")
    list_filter = ("sale__business",)
    search_fields = ("product__product_name",)
