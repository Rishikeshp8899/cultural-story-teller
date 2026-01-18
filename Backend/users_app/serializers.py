from rest_framework import serializers
from .models import UserDetails
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = UserDetails.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            password=make_password(validated_data['password']) 
        )
        return user
    
    
