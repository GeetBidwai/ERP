from django.urls import path
from .views import business_list, seed_businesses

urlpatterns = [
    path("", business_list),
    path("seed/", seed_businesses),
]