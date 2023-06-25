from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken


def is_auth(func):
    # @wraps(func)
    def inner(request, *args, **kwargs):
        try:
            access_token = request.headers['Authorization']
            split_token = access_token.split(" ")
            if split_token[0] not in settings.SIMPLE_JWT["AUTH_HEADER_TYPES"]:
                raise Exception("Token is invalid or expired")
            decoded_token = AccessToken(split_token[1])
        except Exception as e:
            return Response({"error": str(e)})
        return func(request, decoded_access=decoded_token, *args, **kwargs)
    return inner
