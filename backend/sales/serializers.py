from decimal import Decimal

from django.db import transaction
from rest_framework import serializers

from inventory.models import Inventory

from .models import Sale, SaleItem


class SaleItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.product_name", read_only=True)

    class Meta:
        model = SaleItem
        fields = ("id", "product", "product_name", "quantity", "selling_price", "subtotal")
        read_only_fields = ("id", "subtotal")


class SaleItemInputSerializer(serializers.Serializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all())
    quantity = serializers.IntegerField(min_value=1)
    selling_price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal("0"))


class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemInputSerializer(many=True, write_only=True, required=False)
    sale_items = SaleItemSerializer(source="items", many=True, read_only=True)

    class Meta:
        model = Sale
        fields = (
            "id",
            "invoice_number",
            "business",
            "customer_name",
            "sale_date",
            "sale_time",
            "payment_mode",
            "remarks",
            "total_amount",
            "items",
            "sale_items",
            "created_at",
        )
        read_only_fields = ("id", "invoice_number", "sale_date", "sale_time", "total_amount", "created_at")

    def validate(self, attrs):
        items = attrs.get("items")
        business = attrs.get("business", getattr(self.instance, "business", None))

        if self.instance and "business" in attrs and business != self.instance.business:
            raise serializers.ValidationError({
                "business": "A sale cannot be moved to another business.",
            })

        if self.instance is None and not items:
            raise serializers.ValidationError({"items": "At least one sale item is required."})

        if items and business:
            invalid_products = [
                item["product"].id
                for item in items
                if item["product"].business_id != business.id
            ]
            if invalid_products:
                raise serializers.ValidationError({
                    "items": "Every product must belong to the sale business.",
                })

        return attrs

    @staticmethod
    def _next_invoice_number():
        previous_sale = Sale.objects.select_for_update().order_by("-id").first()
        previous_number = 0

        if previous_sale:
            try:
                previous_number = int(previous_sale.invoice_number.removeprefix("INV-"))
            except ValueError:
                previous_number = previous_sale.id

        return f"INV-{previous_number + 1:06d}"

    @staticmethod
    def _deduct_inventory(items, business):
        requested_quantities = {}
        for item in items:
            product_id = item["product"].id
            requested_quantities[product_id] = requested_quantities.get(product_id, 0) + item["quantity"]

        products = {
            product.id: product
            for product in Inventory.objects.select_for_update().filter(
                id__in=requested_quantities,
                business=business,
            )
        }

        unavailable_product_ids = [
            product_id
            for product_id, quantity in requested_quantities.items()
            if product_id not in products or products[product_id].remaining_bags < quantity
        ]
        if unavailable_product_ids:
            raise serializers.ValidationError({
                "items": "One or more products do not have enough remaining stock.",
            })

        for product_id, quantity in requested_quantities.items():
            product = products[product_id]
            product.remaining_bags -= quantity
            product.save(update_fields=("remaining_bags", "updated_at"))

    def create(self, validated_data):
        items = validated_data.pop("items")
        business = validated_data["business"]

        with transaction.atomic():
            self._deduct_inventory(items, business)
            total_amount = sum(
                (item["quantity"] * item["selling_price"] for item in items),
                Decimal("0"),
            )
            sale = Sale.objects.create(
                **validated_data,
                invoice_number=self._next_invoice_number(),
                total_amount=total_amount,
            )
            SaleItem.objects.bulk_create([
                SaleItem(
                    sale=sale,
                    product=item["product"],
                    quantity=item["quantity"],
                    selling_price=item["selling_price"],
                    subtotal=item["quantity"] * item["selling_price"],
                )
                for item in items
            ])

        return sale


class SaleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = (
            "id",
            "invoice_number",
            "customer_name",
            "sale_date",
            "sale_time",
            "payment_mode",
            "total_amount",
        )
