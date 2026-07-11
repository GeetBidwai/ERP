from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "accounts"

    def ready(self):
        import os

        if os.environ.get("RENDER"):
            from django.contrib.auth import get_user_model

            User = get_user_model()

            username = "Bidwai"
            password = "Boss@1207"

            if not User.objects.filter(username=username).exists():
                User.objects.create_superuser(
                    username=username,
                    email="geetbidwai0102@gmail.com",
                    password=password,
                )
                print("✅ Default admin created.")