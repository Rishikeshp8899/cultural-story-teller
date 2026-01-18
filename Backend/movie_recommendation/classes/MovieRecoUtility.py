# import os
# import io
# import re
# import json
# import ssl
# import base64
# import asyncio
# import logging
# from pathlib import Path
# from urllib import response
# from django.http import Http404, StreamingHttpResponse
# import nltk
# import emoji
# import joblib
# import contractions
# import numpy as np
# from django.conf import settings
# from gtts import gTTS
# from PIL import Image
# from openai import OpenAI
# from nltk.tokenize import sent_tokenize
# from moviepy import ImageSequenceClip, AudioFileClip
# from sentence_transformers import SentenceTransformer
# import tensorflow as tf
# from movie_recommendation.models import CustomerDetails , VideoStats, VideoEventLogs ,Video
# from movie_recommendation.classes.Story import Story
# from pathlib import Path
# nltk.download("punkt")
# nltk.download('stopwords')

# ssl._create_default_https_context = ssl._create_unverified_context
# sentence_model = SentenceTransformer("all-MiniLM-L6-v2")
# logger = logging.getLogger(__name__)


# class MovieRecommendationService:
#     def __init__(self):
#         self.client = OpenAI(api_key="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")
#         self.BASE_STYLE = (
#         "Studio Ghibli–inspired illustration, soft watercolor textures, "
#         "dreamy atmosphere, warm pastel colors, hand-painted look, "
#         "whimsical, cinematic, 16:9, ")
#         self.parent_check_list=["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
#         self.stop_words = set(nltk.corpus.stopwords.words("english"))
#         self.base_dir = Path(__file__).resolve().parents[3]

#     def build_5_story_prompt(self,customer: CustomerDetails) -> str:
#         return f"""
#         You are a creative AI storyteller.

#         Create EXACTLY 5 short stories for video narration.

#         Each story must:
#         - Be suitable for a {customer.age}-year-old
#         - Be 2 minutes long when narrated
#         - Use simple, engaging language
#         - Be immersive and visual
#         - Teach the educational goal naturally

#         Story details:
#         Hero name: {customer.hero_name}
#         Interests: {customer.interests}
#         World: {customer.world_setting}
#         Educational goal: {customer.educational_goals}

#         Rules:
#         - Return ONLY a JSON array
#         - Each item: title, story , genre ,
#         """
#     def getParentPrompt(self,customer: CustomerDetails) -> str:
#         return f"""
#         The story must:
#         - Be suitable for a {customer.age}-year-old
#         Story details:
#         Hero name: {customer.hero_name}
#         Interests: {customer.interests}
#         World: {customer.world_setting}
#         Educational goal: {customer.educational_goals}
#         """
# #     def image_bytes_to_array(self, image_bytes: bytes) -> np.ndarray:
#         if image_bytes is None:
#             raise ValueError("Image bytes are None")
#         image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
#         return np.array(image)

    # def generate_stories(self, user_id: str) -> list[Story]:
    #     customer = CustomerDetails.objects.filter(cus_id=user_id).first()
    #     prompt = self.build_5_story_prompt(customer)
    #     try:
    #         response = self.client.chat.completions.create(
    #             model="gpt-5-mini",
    #             messages=[{"role": "system", "content": prompt}]
    #         )
    #         stories_json = json.loads(response.choices[0].message.content)
    #         logger.info(f"Generated stories: {stories_json}")
    #         return [Story(title=s["title"], story=s["story"], genre=s["genre"]) for s in stories_json]
    #     except Exception as e:
    #         logger.error(f"Story generation failed: {str(e)}")
    #         raise Exception("Failed to generate stories.")

    
#     # async def generate_image(self, prompt: str, width: int, height: int, idx: int):
#     #     try:
#     #         result = self.client.images.generate(
#     #         model="gpt-image-1-mini",
#     #         prompt=prompt,
#     #         size=f"{width}x{height}"
#     #         )
#     #         image_bytes = base64.b64decode(result.data[0].b64_json)
#     #         return {"id": idx, "bytes": image_bytes}
#     #     except Exception as e:
#     #         logger.error(f"Image generation failed for prompt '{prompt}': {str(e)}")
#     #         return {"id": idx, "bytes": None}   
#     async def generate_image(self, prompt: str, width: int, height: int, idx: int):
#         try:
#             safe_prompt = (
#             "Original child-friendly illustration, "
#             "soft watercolor style, warm pastel colors, "
#             "whimsical and cinematic, "
#             + prompt)
#             result = self.client.images.generate(
#             model="gpt-image-1",
#             prompt=safe_prompt,
#             size=f"{width}x{height}")
#             image_bytes = base64.b64decode(result.data[0].b64_json)
#             return {"id": idx, "bytes": image_bytes}
#         except Exception as e:
#             logger.error(f"Image generation failed [{idx}]: {e}")
#             return {"id": idx, "bytes": None}
                

#     @staticmethod
#     async def generate_audio(text: str, path: Path):
#         tts = gTTS(text=text, lang="en")
#         tts.save(path)
#         return path
    

#     async def generate_video(self, user_id: str, title: str, script: str, genre: str):
    
#         # --- Create directories ---
#         base_dir = self.base_dir / "videos" / title.replace(" ", "_")
#         images_dir = base_dir / "images"
#         base_dir.mkdir(parents=True, exist_ok=True)
#         images_dir.mkdir(parents=True, exist_ok=True)
    
#         #video_path = (base_dir / title.replace(" ", "_")).with_suffix(".mp4")
#         audio_path = (base_dir / title.replace(" ", "_")).with_suffix(".mp3")
    
#         # --- Safety check ---
#         secure = self.check_script(script)
#         if set(self.parent_check_list).intersection(set(secure)):
#             logger.info(f"Script for video '{title}' flagged for inappropriate content.")
#             return {"error": "Script contains inappropriate content."}
    
#         # --- Chunk script for fewer images ---
#         sentences = [s.strip() for s in re.split(r'[.!?]', script) if s.strip()]
#         max_images = min(10, len(sentences))
#         chunk_size = max(1, len(sentences) // max_images)
#         chunks = [" ".join(sentences[i:i+chunk_size]) for i in range(0, len(sentences), chunk_size)]
    
#         # --- Generate images asynchronously ---
#         # tasks = []
#         # for i, chunk in enumerate(chunks):
#         #     prompt = f"{self.BASE_STYLE} {chunk}"
#         #     tasks.append(self.generate_image(prompt, 1024, 1024, i))
    
#         # images = await asyncio.gather(*tasks)
#         # images.sort(key=lambda x: x["id"])
    
#         # image_arrays = []
#         # for img in images:
#         #     if img["bytes"] is None:
#         #         logger.warning(f"Skipping image {img['id']} due to generation failure")
#         #         continue
#         #     arr = self.image_bytes_to_array(img["bytes"])
#         #     image_arrays.append(arr)
#         #     image_path = images_dir / f"frame_{img['id']:03d}.png"
#         #     Image.fromarray(arr).save(image_path)

    
#         # --- Generate audio asynchronously ---
#         await asyncio.to_thread(gTTS(text=script, lang="en").save, audio_path)
#         audio = AudioFileClip(audio_path)
    
#         # --- Calculate FPS to match audio duration ---
#         # fps = max(1, len(image_arrays) / audio.duration)
    
#         # --- Create video ---
#         # clip = ImageSequenceClip(image_arrays, fps=fps).with_audio(audio).set_duration(audio.duration)
    
#         # # --- Write video file ---
#         # clip.write_videofile(
#         #     video_path,
#         #     codec="libx264",
#         #     audio_codec="aac",
#         #     preset="medium",
#         #     bitrate="2M"
#         # )
    
#         # --- Save video info to database ---
#         video = Video.objects.create(
#             video_id=title.replace(" ", "_"),
#             title=title,
#             description=script,
#             genre=genre,
#             duration_sec=int(audio.duration),
#             created_by=user_id,
#             is_active=True,
#             safety_score=1.0,
#             prompt=script,
#             status="generated",
#             tag=genre,
#             path=str(audio_path),
#             source_type=1,
#         )
#         video.save()
#         logger.info(f"Video generated and saved: {video}")
    
#         return {
#             "audio": str(audio_path)
#         }
    
#     def check_script(self, script: str) -> str:
#         text=self.preprocess_script(script)
#         model_path_tfidf = self.base_dir /"Backend" / "movie_recommendation" / "ml_model"/"tfidf_vectorizer.pkl"
#         vectorizer = joblib.load(model_path_tfidf)
#         model_path = self.base_dir /"Backend" / "movie_recommendation" / "ml_model"/"toxic_model.pkl"
#         model = joblib.load(model_path)
#         X = vectorizer.transform([text])
#         prediction = model.predict(X)
#         prediction = prediction.ravel() 
#         check_list=self.parent_check_list
#         result = [check_list[i] for i, val in enumerate(prediction) if val == 1]
#         return result
    
#     def preprocess_script(self, text: str) -> str:
#         text = text.lower()
#         text = contractions.fix(text)
#         text = re.sub(r'http\S+|www\S+', '', text)
#         text = re.sub(r'<.*?>', '', text)
#         text = emoji.replace_emoji(text, replace='')
#         text = re.sub(r'[^a-z\s]', '', text)
#         text = re.sub(r'\s+', ' ', text).strip()
#         words = text.split()
#         words = [w for w in words if w not in self.stop_words]
#         return " ".join(words)

    
#     def recommend_videos(self,user_query, movies_norm, top_n=3):
#         # Encode query
#         query_emb = sentence_model.encode([user_query], convert_to_numpy=True)
#         query_emb_tf = tf.convert_to_tensor(query_emb, dtype=tf.float32)
#         query_norm = tf.nn.l2_normalize(query_emb_tf, axis=1)
    
#         # Cosine similarity
#         similarity = tf.matmul(movies_norm, query_norm, transpose_b=True)
#         similarity = tf.squeeze(similarity, axis=1)
    
#         # Top N indices
#         top_indices = tf.argsort(similarity, direction='DESCENDING')[:top_n]
    
#         return top_indices.numpy().tolist(), similarity.numpy().tolist()
    
    # def load_videos_from_db(self,user_id: str):
    #     videos_logs= VideoEventLogs.objects.filter(user_id=user_id).values_list('video_id', flat=True)
    #     videos_not_watched=list(Video.objects.exclude(video_id__in=videos_logs))
    #     print("tkedkmldkemlkdm", videos_not_watched)
    #     texts = []
    #     valid_videos = []
    #     for v in videos_not_watched:
    #         if v.prompt and isinstance(v.prompt, str) and v.prompt.strip():
    #             texts.append(v.prompt.strip())
    #             valid_videos.append(v)
    #     # texts = [v.prompt for v in videos_not_watched]
    #     embeddings = sentence_model.encode(texts, convert_to_numpy=True)
    #     if embeddings.ndim == 1:
    #         embeddings = embeddings.reshape(1, -1)
    #         embeddings_tf = tf.convert_to_tensor(embeddings, dtype=tf.float32)
    #     Video_norm = tf.nn.l2_normalize(embeddings_tf, axis=1)
    #     return valid_videos, Video_norm
    
    # def video_stream(self, filePath: str, user_id: str = None):
    #     logs=VideoEventLogs.objects.create(
    #     event_type="audio_complete",
    #     user_id=user_id,
    #     video_id=os.path.basename(filePath),
    #     completion_rate=0.98,
    #     watch_time=118,
    #     action=5
    #     )
    #     logs.save()
    #     print("Video streaming started for file:", filePath)
    #     print(logs)
    #     if not os.path.exists(filePath):
    #         raise Http404(f"Video not found at {filePath}")
    #     def stream():
    #         with open(filePath, 'rb') as f:
    #             while True:
    #                 chunk = f.read(8192)  # 8KB chunks
    #                 if not chunk:
    #                     break
    #                 yield chunk
    #     response = StreamingHttpResponse(
    #         stream(),
    #         content_type="video/mp4")
    #     response["Content-Length"] = os.path.getsize(filePath)
    #     response["Accept-Ranges"] = "bytes"
    #     return response
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

# Initializations
nltk.download("punkt", quiet=True)
nltk.download('stopwords', quiet=True)
ssl._create_default_https_context = ssl._create_unverified_context
sentence_model = SentenceTransformer("all-MiniLM-L6-v2")
logger = logging.getLogger(__name__)


class MovieRecommendationService:
    def __init__(self):
        # API Key settings.py se fetch karein (Security best practice)
        self.client = OpenAI(api_key="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")
        self.BASE_STYLE = (
            "Studio Ghibli–inspired illustration, soft watercolor textures, "
            "dreamy atmosphere, warm pastel colors, hand-painted look, cinematic, 16:9"
        )
        self.parent_check_list = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
        self.stop_words = set(nltk.corpus.stopwords.words("english"))
        self.base_dir = Path(__file__).resolve().parents[3]

    def _generate_clean_id(self, title: str) -> str:
        """Ek unique aur clean ID generate karne ke liye"""
        clean_title = re.sub(r'[^a-zA-Z0-9]', '_', title).lower()
        return f"{clean_title}_{uuid.uuid4().hex[:6]}"

    def generate_video(self, user_id: str, title: str, script: str, genre: str):
        # 1. Unique ID generate karein jo har jagah use hogi
        vid_id = self._generate_clean_id(title)
        base_dir = self.base_dir / "videos" / vid_id
        base_dir.mkdir(parents=True, exist_ok=True)
        audio_path = base_dir / f"{vid_id}.mp3"

        # 2. Safety Check
        secure_results = self.check_script(script)
        if any(item in self.parent_check_list for item in secure_results):
            logger.warning(f"Safety Alert: Content flagged for {secure_results}")
            return {"error": "Inappropriate content detected", "flags": secure_results}

        try:
            # 3. Audio Generation (Using Thread for Sync gTTS)
            gTTS(text=script, lang="en").save(str(audio_path))
            audio_clip = AudioFileClip(str(audio_path))
            duration = int(audio_clip.duration)
            audio_clip.close()

            # 4. Database Mein Save (Atomic Transaction)
            with transaction.atomic():
                video_record = Video.objects.create(
                    video_id=vid_id,  # Yeh ID ab Logs se match karegi
                    title=title,
                    description=script,
                    genre=genre,
                    duration_sec=duration,
                    created_by=user_id,
                    is_active=True,
                    status="generated",
                    path=str(audio_path),
                    source_type=1,
                    language="en",
                    prompt=script,
                    tag=genre

                )
                logger.info(f"Successfully saved Video: {vid_id}")

            return {"status": "success", "video_id": vid_id, "audio_path": str(audio_path)}

        except Exception as e:
            logger.error(f"Error in generate_video: {str(e)}")
            return {"error": str(e)}

    def video_stream(self, filePath: str, user_id: str):
        """Streaming and logging fix"""
        if not os.path.exists(filePath):
            raise Http404(f"File not found: {filePath}")

        # ID nikalne ka sahi tarika (File name hi video_id hai)
        vid_id = os.path.splitext(os.path.basename(filePath))[0]

        try:
            with transaction.atomic():
                log = VideoEventLogs.objects.create(
                    event_type="audio_stream_start",
                    user_id=user_id,
                    video_id=vid_id, # Yeh ab Video table ki ID se match karega
                    completion_rate=0.0,
                    watch_time=0,
                    action=1
                )
                logger.info(f"Stream Log created for {vid_id}")
        except Exception as e:
            logger.error(f"Failed to save log: {e}")

        def stream():
            with open(filePath, 'rb') as f:
                while chunk := f.read(8192):
                    yield chunk

        response = StreamingHttpResponse(stream(), content_type="audio/mpeg")
        response["Content-Length"] = os.path.getsize(filePath)
        response["Accept-Ranges"] = "bytes"
        return response

    def check_script(self, script: str) -> list:
        """Toxic content detection logic"""
        try:
            text = self.preprocess_script(script)
            # Paths ko settings se manage karna behtar hai
            ml_path = self.base_dir / "Backend" / "movie_recommendation" / "ml_model"
            vectorizer = joblib.load(ml_path / "tfidf_vectorizer.pkl")
            model = joblib.load(ml_path / "toxic_model.pkl")
            
            X = vectorizer.transform([text])
            prediction = model.predict(X).ravel()
            return [self.parent_check_list[i] for i, val in enumerate(prediction) if val == 1]
        except Exception as e:
            logger.error(f"Safety check failed: {e}")
            return []

    def preprocess_script(self, text: str) -> str:
        text = text.lower()
        text = contractions.fix(text)
        text = re.sub(r'http\S+|[^a-z\s]', '', text)
        words = [w for w in text.split() if w not in self.stop_words]
        return " ".join(words)
    
    def build_5_story_prompt(self,customer: CustomerDetails) -> str:
        return f"""
        You are a STRICT JSON GENERATION ENGINE.
        TASK: Generate EXACTLY 5 short stories for video narration.
        AGE:Stories must be suitable for a {customer.age}-year-old child.
        STORY REQUIREMENTS:
        - ~2 minutes long when narrated
        - Simple, engaging language
        - Immersive and visual
        - Naturally teaches the educational goal
        - Child-safe content only
        STORY DETAILS:
        Hero name: {customer.hero_name}
        Interests: {customer.interests}
        World setting: {customer.world_setting}
        Educational goal: {customer.educational_goals}
        OUTPUT RULES (MANDATORY):
        - Return ONLY valid JSON
        - Do NOT include explanations
        - Do NOT include markdown
        - Do NOT include extra text
        - Output MUST start with '[' and end with ']'
        - Use double quotes for all strings
        OUTPUT FORMAT (EXACT – DO NOT CHANGE):
        [
        {{
            "title": "string",
            "story": "string",
            "genre": "string"}}
            ]
        """

    def load_videos_from_db(self,user_id: str):
        videos_logs= VideoEventLogs.objects.filter(user_id=user_id).values_list('video_id', flat=True)
        videos_not_watched=list(Video.objects.exclude(video_id__in=videos_logs))
        print(videos_not_watched)
        print("tkedkmldkemlkdm", videos_not_watched)
        texts = []
        valid_videos = []
        for v in videos_not_watched:
            if v.description and isinstance(v.description, str) and v.description.strip():
                texts.append(v.description.strip())
                valid_videos.append(v)
        # texts = [v.prompt for v in videos_not_watched]
        embeddings = sentence_model.encode(texts, convert_to_numpy=True)
        if embeddings.ndim == 1:
            embeddings = embeddings.reshape(1, -1)
        embeddings_tf = tf.convert_to_tensor(embeddings, dtype=tf.float32)
        Video_norm = tf.nn.l2_normalize(embeddings_tf, axis=1)
        return valid_videos, Video_norm
    
    def generate_stories(self, user_id: str) -> list[Story]:
        customer = CustomerDetails.objects.filter(cus_id=user_id).first()
        prompt = self.build_5_story_prompt(customer)
        try:
            response = self.client.chat.completions.create(
                model="gpt-5-mini",
                messages=[{"role": "system", "content": prompt}]
            )
            print("Story Generation Response:", response)
            # stories_json = json.loads(story_text = response.choices[0].message.content.strip())
            # logger.info(f"Generated stories: {stories_json}")
            # return [Story(title=s["title"], story=s["story"], genre=s["genre"]) for s in stories_json]
            raw_content = response.choices[0].message.content.strip()
            if not raw_content.startswith("["):
                raise ValueError("Model did not return JSON")
            stories_json = json.loads(raw_content)
            return [Story(title=s["title"], story=s["story"], genre=s["genre"]) for s in stories_json]
        except Exception as e:
            logger.error(f"Story generation failed: {str(e)}")
            raise Exception("Failed to generate stories.")
        
    def getParentPrompt(self,customer: CustomerDetails) -> str:
        return f"""
        The story must:
        - Be suitable for a {customer.age}-year-old
        Story details:
        Hero name: {customer.hero_name}
        Interests: {customer.interests}
        World: {customer.world_setting}
        Educational goal: {customer.educational_goals}
        """
    
    def recommend_videos(self,user_query, movies_norm, top_n=3):
        # Encode query
        query_emb = sentence_model.encode([user_query], convert_to_numpy=True)
        query_emb_tf = tf.convert_to_tensor(query_emb, dtype=tf.float32)
        query_norm = tf.nn.l2_normalize(query_emb_tf, axis=1)
    
        # Cosine similarity
        similarity = tf.matmul(movies_norm, query_norm, transpose_b=True)
        similarity = tf.squeeze(similarity, axis=1)
    
        # Top N indices
        top_indices = tf.argsort(similarity, direction='DESCENDING')[:top_n]
    
        return top_indices.numpy().tolist(), similarity.numpy().tolist()
        