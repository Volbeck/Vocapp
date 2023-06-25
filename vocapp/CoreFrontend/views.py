from django.shortcuts import render

from Decorators.auth_decorators import is_auth



def index(request, *args, **kwargs):
    return render(request, 'CoreFrontend/index.html')