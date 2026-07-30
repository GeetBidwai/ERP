import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = [("businesses", "0001_initial")]

    operations = [
        migrations.CreateModel(
            name="Supplier",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("supplier_name", models.CharField(max_length=200)),
                ("contact_person", models.CharField(blank=True, max_length=200)),
                ("phone", models.CharField(max_length=15)),
                ("email", models.EmailField(blank=True, max_length=254)),
                ("address", models.TextField(blank=True)),
                ("city", models.CharField(blank=True, max_length=100)),
                ("state", models.CharField(blank=True, max_length=100)),
                ("gst_number", models.CharField(blank=True, max_length=15)),
                ("opening_balance", models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ("payment_terms", models.CharField(blank=True, max_length=200)),
                ("status", models.CharField(choices=[("Active", "Active"), ("Inactive", "Inactive")], default="Active", max_length=10)),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("business", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="suppliers", to="businesses.business")),
            ],
            options={"ordering": ("supplier_name",)},
        ),
        migrations.AddConstraint(
            model_name="supplier",
            constraint=models.UniqueConstraint(fields=("business", "supplier_name"), name="unique_supplier_name_per_business"),
        ),
    ]
