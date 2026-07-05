from django.urls import path
from .views import business_list

urlpatterns = [
    path("", business_list),
]