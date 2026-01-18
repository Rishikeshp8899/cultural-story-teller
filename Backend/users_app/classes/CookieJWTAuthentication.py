from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt
from .models import UserDetails
import os
from dotenv import load_dotenv

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        load_dotenv()
        JWT_SECRET = os.getenv("JWT_SECRET")
        token = request.COOKIES.get("access_token")
        if not token:
            return None
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            user = UserDetails.objects.get(user_id=payload["user_id"])
            return (user, None)
        except:
            raise AuthenticationFailed("Invalid token")
