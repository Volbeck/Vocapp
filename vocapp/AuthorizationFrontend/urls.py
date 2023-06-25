from django.urls import path

from .views import *

urlpatterns = [
    path('singup/', index, name='singup'),
    path('singin/', index, name='singin'),
]