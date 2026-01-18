# consumers/story_generator.py
from kafka import KafkaConsumer
import json
import logging
from Backend.movie_recommendation.redis.redis_client import redis_client
from .kafkaProducer import send_event

logger = logging.getLogger(__name__)

consumer = KafkaConsumer(
    "PROMPT_EVENTS",
    bootstrap_servers="localhost:9092",
    value_deserializer=lambda x: json.loads(x.decode("utf-8")),
    group_id="story-generator"
)

for message in consumer:
    prompt = message.value
    prompt_id = f"story:{prompt['video_id']}"

    logger.info({
        "event": "STORY_GEN_START",
        "prompt": prompt
    })

    # 🔹 AI call (mock)
    story = f"Story for video {prompt['video_id']}"

    redis_client.setex(prompt_id, 3600, story)

    send_event("STORY_EVENTS", {
        "prompt_id": prompt_id,
        "story": story
    })

    logger.info({
        "event": "STORY_GENERATED",
        "prompt_id": prompt_id
    })
