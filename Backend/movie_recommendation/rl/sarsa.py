# rl/sarsa.py
import numpy as np
import random

from datetime import timedelta
from django.utils.timezone import now

from movie_recommendation.models import VideoEventLogs
ALPHA = 0.1      
GAMMA = 0.95     
EPSILON = 0.1   
ACTIONS = ["EXPLORE", "EXPLOIT"]
ENGAGEMENT_THRESHOLD = 0.6
Q = {}


def _init_state(state):
    if state not in Q:
        Q[state] = {a: 0.0 for a in ACTIONS}


def update(state, action, reward, next_state, next_action):
    _init_state(state)
    _init_state(next_state)

    predict = Q[state][action]
    target = reward + GAMMA * Q[next_state][next_action]

    Q[state][action] += ALPHA * (target - predict)

def select_action(state, log):
    _init_state(state)
    five_min_ago = now() - timedelta(minutes=5)
    log=log.filter(created_at__gte=five_min_ago)
  
    if not log.exists():
        return "EXPLORE"

    score = 0
    count = 0

    for e in log:
        score += (
            e.watch_time * 0.4 +
            e.completion_rate * 0.4 +
            (2 if e.like else 0) +
            (3 if e.share else 0) -
            (2 if e.skipped else 0)
        )
        count += 1

    avg_score = score / count

    # Step 2: Exploration if engagement is low
    if avg_score < ENGAGEMENT_THRESHOLD:
        return "EXPLORE"

    # Step 3: Exploitation → USE Q-TABLE HERE 🔥
    return max(Q[state], key=Q[state].get)


