from django.urls import path
from .csrf import csrf

from .views import login_view, logout_view, session_view

urlpatterns = [
    path("login/", login_view),
    path("logout/", logout_view),
    path("session/", session_view),
    path("csrf/", csrf),
]
