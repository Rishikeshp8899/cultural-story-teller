from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import UserDetails
from .utilityClass import verify_password , hash_password
from rest_framework.permissions import AllowAny
import os
from rest_framework_simplejwt.authentication import JWTAuthentication
from dotenv import load_dotenv

class LoginView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password =  request.data.get("password")

        try:
            user = UserDetails.objects.get(email=email)
            varify = verify_password(password, user.password)
            if not varify:
                return Response({"error": "Invalid password"}, status=401)

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = Response({
                "message": "Login successful",
                "user_id": str(user.user_id)

            })
            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                samesite='Lax',
                max_age=15 * 60 
            )
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                samesite='Lax',
                max_age=3*24*60*60
            )
            return response
        

        except UserDetails.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
