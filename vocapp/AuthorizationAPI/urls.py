from django.urls import path, re_path, include

from .views import *
from rest_framework_simplejwt import views as jwt_views
urlpatterns = [
    path('emailvalidator/', EmailValidator.as_view(), name="emailvalidator"),
    path('usernamevalidator/', UsernameValidator.as_view(), name="emailvalidator"),

    path('', include('djoser.urls')),

    path('activate/<str:uid>/<str:token>', activate_account, name='activate_account'),

    path("jwt/create/", LoginAPIView.as_view(), name="create_jwt"),
    path('jwt/refresh/', RefreshAPIView.as_view(), name="refresh_jwt"),
    path('logout/', LogoutAPIView.as_view(), name="logout")
]