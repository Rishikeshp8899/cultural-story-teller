import os
import io
import re
import json
import ssl
import base64
import asyncio
import logging
import uuid
from pathlib import Path
from venv import logger
from django.conf import settings
from django.db import transaction
from django.http import Http404, StreamingHttpResponse
import nltk
import emoji
import joblib
import contractions
import numpy as np
import tensorflow as tf
from gtts import gTTS
from PIL import Image
from openai import OpenAI
from moviepy import AudioFileClip
from sentence_transformers import SentenceTransformer
from movie_recommendation.models import CustomerDetails, VideoStats, VideoEventLogs, Video
from movie_recommendation.classes.Story import Story
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from movie_recommendation.classes.MovieRecoUtility import MovieRecommendationService
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes

recon = MovieRecommendationService()

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([JWTAuthentication]) 
def get_stroy_from_text(request):
    try:
        data = request.data
        user_id = data.get("user_id")
        story_text = data.get("story_text")
        if not story_text:
            return Response({"error": "Story text is required"}, status=status.HTTP_400_BAD_REQUEST)
        video_list,noms =recon.load_videos_from_db(user_id)
        id_list, score=recon.recommend_videos(story_text,noms)
        videos_recom = [video_list[i] for i in id_list]
        
        for video in videos_recom:
            try:
                logger.info({"event": "STREAMING_VIDEO", "video_id": video.video_id})
                # Pass user_id taaki logs mein entry ho sake
                return recon.video_stream(video.path, user_id)
            except Exception as e:
                logger.error({"event": "STREAM_RETRY", "video_id": video.video_id, "error": str(e)})
                continue
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
