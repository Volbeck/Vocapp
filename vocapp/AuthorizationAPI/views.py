from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.shortcuts import redirect
from django.core.validators import EmailValidator as DjangoEmailValidator
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth import get_user_model
import requests
from djoser.conf import settings
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken



# Create your views here.

class ValidatorBase(APIView):
    validator = None
    error_message = ""

    def post(self, request):
        data_key = self.get_data_key()
        data_value = request.data.get(data_key)

        if data_value:
            try:
                self.validator(data_value)
            except ValidationError as e:
                return Response({"valid": False, "errors": e})
            if self.check_exists(data_key, data_value):
                return Response({"valid": False, "errors": [self.error_message]})

            return Response({"valid": True})
        else:
            return Response({"valid": False, "errors": [f"{data_key.capitalize()} is missing from the request"]})

    def get_data_key(self):
        raise NotImplementedError()

    def check_exists(self, data_key, data_value):
        raise NotImplementedError()

class EmailValidator(ValidatorBase):
    validator = DjangoEmailValidator()
    error_message = "Email address is already registered"

    def get_data_key(self):
        return "email"

    def check_exists(self, data_key, data_value):
        return User.objects.filter(email=data_value).exists()

class UsernameValidator(ValidatorBase):
    validator = UnicodeUsernameValidator()
    error_message = "Username is already taken"

    def get_data_key(self):
        return "username"

    def check_exists(self, data_key, data_value):
        return get_user_model().objects.filter(username=data_value).exists()

def activate_account(request, uid, token):
    data = {
        'uid': uid,
        'token': token,
    }
    response = requests.post('http://127.0.0.1:8000/api/auth/users/activation/', data=data)
    return redirect('singin')

class LoginAPIView(APIView):
    def post(self, request):
        filter_kwargs = {settings.USER_ID_FIELD: request.data[settings.USER_ID_FIELD]}
        user = User.objects.filter(**filter_kwargs).first()
        if not user:
            raise APIException('Invalid credentials!')

        if not user.check_password(request.data['password']):
            raise APIException('Invalid credentials!')

        if not user.is_active:
            raise APIException("User is not activated")

        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)

        response = Response()
        response.set_cookie(key='refreshToken', value=refresh_token, httponly=True, secure=request.is_secure())
        response.data = {
            'token': str(access_token)
        }

        return response

class RefreshAPIView(APIView):
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refreshToken')
            decoded_token = RefreshToken(refresh_token)
            return Response({
                'token': str(decoded_token.access_token)
            })
        except Exception as e:
            return Response({'error': str(e)})

class LogoutAPIView(APIView):
    def post(self, _):
        response = Response()
        response.delete_cookie(key="refreshToken")
        response.data = {
            'message': 'success'
        }
        return response
