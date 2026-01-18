# urls.py
from django.urls import path
from movie_recommendation.classes.ParentCustomerDetailView import ParentCustomerDetailsView
from movie_recommendation.classes.RecommendVideoView import RecommendVideoView
from movie_recommendation.classes.Dashboard import get_stroy_from_text
urlpatterns = [
    path("recommend/audio", RecommendVideoView.as_view()),
    path("parent/customer-details", ParentCustomerDetailsView.as_view()),
    path("next/story/", get_stroy_from_text),
]
