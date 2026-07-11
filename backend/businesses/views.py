from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Business
from .serializers import BusinessSerializer


@api_view(["GET"])
def business_list(request):
    businesses = Business.objects.all()
    serializer = BusinessSerializer(businesses, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def seed_businesses(request):
    if Business.objects.exists():
        return Response({"message": "Businesses already exist."})

    Business.objects.bulk_create(
        [
            Business(
                name="Bidwai Grain Store",
                business_type="grain",
                description="Main Grain Business",
            ),
            Business(
                name="Bidwai Scrap Merchant",
                business_type="scrap",
                description="Scrap Business",
            ),
            Business(
                name="Bidwai Centering",
                business_type="centering",
                description="Centering Business",
            ),
        ]
    )

    return Response({"message": "Businesses created successfully."})