from __future__ import annotations
import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api_story_teller_backend_rest.settings")

app = Celery("api_story_teller_backend_rest")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()

app.conf.beat_schedule = {
    "sarsa-train-every-1-min": {
        "task": "movie_recommendation.rl.tasks.sarsa_training_job",
        "schedule": crontab(minute="*/1"),
    },
}

app.conf.timezone = "UTC"


__all__ = ("app",)
