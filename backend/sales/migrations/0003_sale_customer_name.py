from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("sales", "0002_sale_invoice_number")]

    operations = [
        migrations.AddField(
            model_name="sale",
            name="customer_name",
            field=models.CharField(default="Walk-in Customer", max_length=200),
        ),
    ]
