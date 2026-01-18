from .rl.celery import celery_app

# Import the RL tasks module so the task definitions in
# `movie_recommendation.rl.tasks` are imported at app startup.
# Celery's autodiscover looks for `<app>.tasks` by default. Since
# our tasks live in a subpackage (`rl.tasks`), importing them here
# ensures the worker process registers them when the app is loaded.

__all__ = ('celery_app',)