# # views.py
# import asyncio
# import json
# import random
# import threading
# import logging
# from django.http import JsonResponse
# from django.views import View
# from movie_recommendation.redis.redis_client import redis_client
# from movie_recommendation.kafka.kafkaProducer import send_event
# from movie_recommendation.rl.recommend import recommend_video
# from movie_recommendation.models import CustomerDetails
# from movie_recommendation.classes.MovieRecoUtility import MovieRecommendationService
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework.permissions import AllowAny

# logger = logging.getLogger(__name__)

# EPSILON = 0.2  

# @method_decorator(csrf_exempt, name="dispatch")
# class RecommendVideoView(View):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = []
#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)
#         self.recommend_video_service = MovieRecommendationService()

#     def _generate_videos_in_background(self, user_id, stories):
#         """
#         Runs in background thread with its own event loop
#         """
#         loop = asyncio.new_event_loop()
#         asyncio.set_event_loop(loop)

#         for story in stories:
#             loop.run_until_complete(
#                 self.recommend_video_service.generate_video(
#                     user_id,
#                     story.title,
#                     story.story,
#                     story.genre
#                 )
#             )

#         loop.close()


#     def post(self, request):
#         body = json.loads(request.body)
#         user_id = body.get("user_id")
#         trace_id = f"trace-{random.randint(100000, 999999)}"
#         logger.info({"event": "RECOMMEND_START","user_id": user_id,"trace_id": trace_id})
#         # --- Explore / Exploit ---
#         strategy = recommend_video({"user_id": user_id})
#         logger.info({"event": "STRATEGY_SELECTED","strategy": strategy,"user_id": user_id,"trace_id": trace_id})

#         if strategy == "EXPLORE":
#             logger.info({"event": "EXPLORE_STRATEGY_SELECTED","user_id": user_id,"trace_id": trace_id})
#             # --- Generate stories for user ---
#             try:
#                 logger.info({"event": "STORY_GENERATION_INITIATED","user_id": user_id,"trace_id": trace_id})    
#                 list_of_stories = self.recommend_video_service.generate_stories(user_id)
#                 thread = threading.Thread(
#                 target=self._generate_videos_in_background,
#                 args=(user_id, list_of_stories),
#                 daemon=True)
#                 thread.start()
#             except Exception as e:
#                 logger.error({"event": "STORY_GENERATION_ERROR","user_id": user_id,"error": str(e),"trace_id": trace_id})
            
#         # --- Start background video generation ---  
#         logger.info({"event": "RECOMMEND_ENGINE STARTED FOR ","user_id": user_id,"trace_id": trace_id}) 
#         parentPrompt =self.recommend_video_service.getParentPrompt(CustomerDetails.objects.filter(cus_id=user_id).first())
#         videos, video_norm = self.recommend_video_service.load_videos_from_db(user_id)
#         if not videos:
#             logger.error({"event": "NO_VIDEOS_AVAILABLE","user_id": user_id,"trace_id": trace_id})
#             return JsonResponse({"error": "No videos available for recommendation."}, status=404)
        
#         if parentPrompt is None or parentPrompt.strip() == "":
#             logger.error({"event": "NO_PARENT_PROMPT","user_id": user_id,"trace_id": trace_id})
#             return self.recommend_video_service.video_stream(videos[0].path)
#         top_indices, scores =self.recommend_video_service.recommend_videos(parentPrompt, video_norm, top_n=3)
#         videos_recom = [videos[i] for i in top_indices]
#         # --- Select videos for streaming response ---
#         for video in videos_recom:
#             logger.info({"event": "RECOMMENDED_VIDEO","user_id": user_id,"video_id": video.video_id,"trace_id": trace_id})
#             try:
#                 return self.recommend_video_service.video_stream(video.path)
#             except Exception as e:
#                 logger.error({"event": "VIDEO_STREAMING_ERROR","user_id": user_id,"video_id": video.video_id,"error": str(e),"trace_id": trace_id})
#                 continue    
#         return JsonResponse({"error": "No videos available for streaming."}, status=404)
        

import asyncio
import json
import random
import threading
import logging
from django.http import JsonResponse
from django.views import View
from django.db import close_old_connections # Import zaroori hai threads ke liye
from movie_recommendation.models import CustomerDetails
from movie_recommendation.classes.MovieRecoUtility import MovieRecommendationService
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.authentication import JWTAuthentication
from movie_recommendation.rl.recommend import recommend_video 

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name="dispatch")
class RecommendVideoView(View):
    authentication_classes = [JWTAuthentication]
    permission_classes = []

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.recommend_video_service = MovieRecommendationService()

    def post(self, request):
        try:
            body = json.loads(request.body)
            user_id = body.get("user_id")
            print("User ID received:", user_id)
            
            if not user_id:
                return JsonResponse({"error": "User ID is required"}, status=400)

            trace_id = f"trace-{random.randint(100000, 999999)}"
            logger.info({"event": "RECOMMEND_START", "user_id": user_id, "trace_id": trace_id})

            # --- Explore / Exploit Logic ---
            # (Maanti hoon ki recommend_video aapka RL function hai jo upar imported hai)
            
            strategy = recommend_video({"user_id": user_id})
            print("Strategy selected:", strategy)
            logger.info({"event": "STRATEGY_SELECTED", "strategy": strategy, "user_id": user_id, "trace_id": trace_id})
            if strategy == "EXPLORE":
                try:
                    list_of_stories = self.recommend_video_service.generate_stories(user_id)
                    for story in list_of_stories:
                        logger.info({"event": "EXPLORE_GENERATING_VIDEO", "title": story.title, "user_id": user_id})
                        self.recommend_video_service.generate_video(user_id,story.title,story.story,story.genre)
                except Exception as e:
                    logger.error({"event": "EXPLORE_ERROR", "error": str(e)})

            # --- Recommendation Logic ---
            customer = CustomerDetails.objects.filter(cus_id=user_id).first()
            if not customer:
                return JsonResponse({"error": "Customer not found"}, status=404)

            parent_prompt = self.recommend_video_service.getParentPrompt(customer)
            videos, video_norm = self.recommend_video_service.load_videos_from_db(user_id)

            if not videos:
                return JsonResponse({"error": "No audio found in library."}, status=404)

            # Similarity check using TensorFlow (Service method)
            top_indices, scores = self.recommend_video_service.recommend_videos(parent_prompt, video_norm, top_n=3)
            videos_recom = [videos[i] for i in top_indices]

            # --- Streaming the Best Match ---
            for video in videos_recom:
                try:
                    logger.info({"event": "STREAMING_VIDEO", "video_id": video.video_id})
                    # Pass user_id taaki logs mein entry ho sake
                    return self.recommend_video_service.video_stream(video.path, user_id)
                except Exception as e:
                    logger.error({"event": "STREAM_RETRY", "video_id": video.video_id, "error": str(e)})
                    continue

            return JsonResponse({"error": "Failed to stream recommended videos"}, status=500)

        except Exception as e:
            logger.error(f"View Error: {str(e)}")
            return JsonResponse({"error": "Internal Server Error"}, status=500)