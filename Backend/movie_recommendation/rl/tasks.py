from celery import shared_task
import logging
from movie_recommendation.rl.batch_trainer import train_last_5_min 
logger = logging.getLogger(__name__)

@shared_task(
        name="movie_recommendation.rl.tasks.sarsa_training_job"
)
def sarsa_training_job():
    logger.info("Starting SARSA training job...")
    train_last_5_min()
    logger.info("SARSA training job completed.")
    return "SARSA training job completed."
