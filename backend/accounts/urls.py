from django.urls import path
from .csrf import csrf


from .views import (
    login_view,
    logout_view,
    session_view,
    jwt_login_view,
    me_view,
)

urlpatterns = [
    # Legacy Session Authentication (temporary)
    path("login/", login_view),
    path("logout/", logout_view),
    path("session/", session_view),
    path("csrf/", csrf),

    # JWT Authentication
    path("jwt/login/", jwt_login_view),
    path("me/", me_view),
]
