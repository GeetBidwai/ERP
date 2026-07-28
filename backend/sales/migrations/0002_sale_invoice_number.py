from django.db import migrations, models


def populate_invoice_numbers(apps, schema_editor):
    Sale = apps.get_model("sales", "Sale")

    for sale in Sale.objects.order_by("id"):
        sale.invoice_number = f"INV-{sale.id:06d}"
        sale.save(update_fields=("invoice_number",))


class Migration(migrations.Migration):
    dependencies = [("sales", "0001_initial")]

    operations = [
        migrations.AddField(
            model_name="sale",
            name="invoice_number",
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
        migrations.RunPython(populate_invoice_numbers, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="sale",
            name="invoice_number",
            field=models.CharField(editable=False, max_length=20, unique=True),
        ),
    ]
