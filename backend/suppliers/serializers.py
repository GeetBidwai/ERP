import re

from rest_framework import serializers

from .models import Supplier

PHONE_PATTERN = re.compile(r"^\+?[1-9]\d{9,14}$")
GST_PATTERN = re.compile(r"^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$")


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

    def validate_phone(self, value):
        normalized_phone = value.strip().replace(" ", "").replace("-", "")
        if not PHONE_PATTERN.fullmatch(normalized_phone):
            raise serializers.ValidationError("Enter a valid phone number with 10 to 15 digits.")
        return normalized_phone

    def validate_gst_number(self, value):
        normalized_gst = value.strip().upper()
        if normalized_gst and not GST_PATTERN.fullmatch(normalized_gst):
            raise serializers.ValidationError("Enter a valid 15-character GST number.")
        return normalized_gst

    def validate(self, attrs):
        business = attrs.get("business", getattr(self.instance, "business", None))
        supplier_name = attrs.get("supplier_name", getattr(self.instance, "supplier_name", "")).strip()
        duplicates = Supplier.objects.filter(business=business, supplier_name__iexact=supplier_name)
        if self.instance:
            duplicates = duplicates.exclude(pk=self.instance.pk)
        if duplicates.exists():
            raise serializers.ValidationError({"supplier_name": "A supplier with this name already exists for this business."})
        attrs["supplier_name"] = supplier_name
        return attrs
