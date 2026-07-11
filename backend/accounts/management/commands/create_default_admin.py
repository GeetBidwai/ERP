from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Creates default admin if it doesn't exist"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        username = "Bidwai"

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING("Admin already exists."))
            return

        User.objects.create_superuser(
            username="Bidwai",
            email="geetbidwai0102@gmail.com",
            password="Boss@1207",
        )

        self.stdout.write(self.style.SUCCESS("Default admin created."))