from django.urls import path

from .views import *

urlpatterns = [
    path('', index),
    path('folders/', index, name="folders"),
    path('modules/', index, name="modules"),
    path('folder/<slug:title>/', index, name="folder"),
    path('modul/<slug:title>/', index, name="modul"),

]