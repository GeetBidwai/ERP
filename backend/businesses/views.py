from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Business
from .serializers import BusinessSerializer


@api_view(["GET"])
def business_list(request):
    businesses = Business.objects.all()
    serializer = BusinessSerializer(businesses, many=True)
    return Response(serializer.data)