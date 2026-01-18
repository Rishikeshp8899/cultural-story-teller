from django.urls import path
from .classes.LoginView import LoginView
from .classes.RegisterView import RegisterView
from .classes.RefreshTokenView import RefreshTokenView

urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("register", RegisterView.as_view(), name="register"),
    path("refresh",RefreshTokenView.as_view(),name="refresh")
]