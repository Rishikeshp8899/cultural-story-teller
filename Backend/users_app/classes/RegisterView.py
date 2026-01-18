from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import UserDetails
from rest_framework.permissions import AllowAny
from .utilityClass import verify_password , hash_password
import os
from dotenv import load_dotenv
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name="dispatch")
class RegisterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    def post(self, request):
        load_dotenv()
        email = request.data.get("email")
        password = request.data.get("password")

        if UserDetails.objects.filter(email=email).exists():
            return Response({"error": "Email already registered"}, status=400)

        hashed_password = hash_password(password)

        user = UserDetails.objects.create(
            email=email,
            password=hashed_password
        )
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        response=Response({"message": "User registered successfully"}, status=201)
        response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                samesite='Lax'
            )
        response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                samesite='Lax'
            )
        return response