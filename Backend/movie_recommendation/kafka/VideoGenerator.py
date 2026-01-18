# consumers/video_generator.py
from kafka import KafkaConsumer
import json
import logging

logger = logging.getLogger(__name__)

consumer = KafkaConsumer(
    "MEDIA_EVENTS",
    bootstrap_servers="localhost:9092",
    value_deserializer=lambda x: json.loads(x.decode("utf-8")),
    group_id="video-generator"
)

for msg in consumer:
    data = msg.value

    logger.info({
        "event": "VIDEO_GENERATION_START",
        "story_id": data["prompt_id"]
    })

    # simulate rendering
    video_url = f"https://cdn.example.com/{data['prompt_id']}.mp4"

    logger.info({
        "event": "VIDEO_PUBLISHED",
        "cdn_url": video_url
    })
