# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import UserDetails
# from .serializers import UserSerializer
# import jwt
# from datetime import datetime, timedelta
# from django.conf import settings
# from django.contrib.auth.hashers import check_password

# import os
# from dotenv import load_dotenv

# JWT_SECRET = os.getenv("JWT_SECRET")  # You can also use settings.SECRET_KEY

# @api_view(["POST"])
# def register(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "User registered successfully"})
#     return Response(serializer.errors, status=400)



# @api_view(["POST"])
# def login(request):
#     email = request.data.get("email")
#     password = request.data.get("password")

#     try:
#         user = UserDetails.objects.get(email=email)

#         if not check_password(password, user.password):
#             return Response({"error": "Invalid password"}, status=401)

#         access_token = create_access_token(user.user_id)
#         refresh_token = create_refresh_token(user.user_id)

#         response = Response({
#             "message": "Login successful"
#         })

#         response.set_cookie(
#             key="access_token",
#             value=access_token,
#             httponly=True,
#             secure=True,        # HTTPS only (True in prod)
#             samesite="Lax",
#             max_age=15 * 60
#         )

#         # Refresh Token (long-lived)
#         response.set_cookie(
#             key="refresh_token",
#             value=refresh_token,
#             httponly=True,
#             secure=True,
#             samesite="Lax",
#             max_age=30 * 24 * 60 * 60
#         )

#         return response

#     except UserDetails.DoesNotExist:
#         return Response({"error": "User not found"}, status=404)

