from __future__ import annotations
import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api_story_teller_backend_rest.settings")

celery_app = Celery("movie_recommendation")

celery_app.config_from_object("django.conf:settings", namespace="CELERY")

celery_app.autodiscover_tasks()

celery_app.conf.beat_schedule = {
    "sarsa-train-every-1-min": {
        "task": "movie_recommendation.rl.tasks.sarsa_training_job",
        "schedule": crontab(minute="*/1"),
    },
}
# In celery.py, add:
celery_app.conf.beat_schedule_filename = "celerybeat-schedule.db"


celery_app.conf.timezone = "UTC"


__all__ = ("celery_app",)

