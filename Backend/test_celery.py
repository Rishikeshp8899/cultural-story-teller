#!/usr/bin/env python
"""
Quick test to verify Celery configuration and scheduler setup
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api_story_teller_backend_rest.settings')
django.setup()

from api_story_teller_backend_rest.celery import app
from movie_recommendation.rl.tasks import sarsa_training_job

print("=" * 60)
print("CELERY CONFIGURATION TEST")
print("=" * 60)

# Check broker connection
print("\n1. Checking Broker Connection...")
try:
    with app.connection() as conn:
        conn.connect()
    print("✓ Broker connection successful")
except Exception as e:
    print(f"✗ Broker connection failed: {e}")

# Check task registration
print("\n2. Checking Task Registration...")
tasks = app.tasks
if 'movie_recommendation.rl.tasks.sarsa_training_job' in tasks:
    print("✓ sarsa_training_job is registered")
else:
    print("✗ sarsa_training_job NOT registered")
    print(f"   Available tasks: {list(tasks.keys())[:5]}...")

# Check beat schedule
print("\n3. Checking Beat Schedule...")
beat_schedule = app.conf.beat_schedule
if 'sarsa-train-every-1-min' in beat_schedule:
    print("✓ Beat schedule 'sarsa-train-every-1-min' is configured")
    print(f"   Task: {beat_schedule['sarsa-train-every-1-min']['task']}")
    print(f"   Schedule: {beat_schedule['sarsa-train-every-1-min']['schedule']}")
else:
    print("✗ Beat schedule NOT configured")
    print(f"   Beat schedules: {list(beat_schedule.keys())}")

# Try to send task
print("\n4. Testing Task Execution...")
try:
    result = sarsa_training_job.delay()
    print(f"✓ Task sent successfully, ID: {result.id}")
except Exception as e:
    print(f"✗ Task execution failed: {e}")

print("\n" + "=" * 60)
print("TEST COMPLETE")
print("=" * 60)
