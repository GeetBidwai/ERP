from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Inventory
from .serializers import InventorySerializer


class InventoryViewSet(viewsets.ModelViewSet):
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated]

    queryset = Inventory.objects.all().order_by("-created_at")