from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from django.shortcuts import get_object_or_404
from movie_recommendation.models import CustomerDetails
import uuid

class ParentCustomerDetailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data
        user_id = data.get("user_id")
        customer = CustomerDetails.objects.filter(cus_id=user_id).first()
        if customer:
            # Update existing customer
            customer.age = data.get("age", customer.age)
            customer.hero_name = data.get("hero_name", customer.hero_name)
            customer.interests = data.get("interests", customer.interests)
            customer.world_setting = data.get("world_setting", customer.world_setting)
            customer.educational_goals = data.get("educational_goals", customer.educational_goals)
            customer.save()
            return Response(
            {
                "message": "Customer updated successfully",
                "customer_id": customer.cus_id
            },
            status=status.HTTP_200_OK)
        
        customer = CustomerDetails.objects.create(
        cus_id=user_id,
        age=data.get("age"),
        hero_name=data.get("hero_name"),
        interests=data.get("interests"),
        world_setting=data.get("world_setting"),
        educational_goals=data.get("educational_goals"),)
        return Response(
        {
            "message": "Customer created successfully",
            "customer_id": customer.cus_id
        },
        status=status.HTTP_201_CREATED
        )

    def get(self, request):
        user = request.user
        try:
            customer = CustomerDetails.objects.get(cus_id=request.query_params.get("user_id"))
            customer_details = {
                "cus_id": customer.cus_id,
                "age": customer.age,
                "hero_name": customer.hero_name,
                "interests": customer.interests,
                "world_setting": customer.world_setting,
                "educational_goals": customer.educational_goals,
            }
            return Response({"customer_details": customer_details})
        except CustomerDetails.DoesNotExist:
            return Response({"error": "Customer details not found"}, status=status.HTTP_404_NOT_FOUND)


    def put(self, request):
        user = request.user
        data = request.data
        customer = get_object_or_404(CustomerDetails, cus_id=data.get("user_id"))

        customer.age = data.get("age", customer.age)
        customer.hero_name = data.get("hero_name", customer.hero_name)
        customer.interests = data.get("interests", customer.interests)
        customer.world_setting = data.get("world_setting", customer.world_setting)
        customer.educational_goals = data.get("educational_goals", customer.educational_goals)
        customer.save()

        return Response({"message": "Customer updated", "cus_id": customer.cus_id})

