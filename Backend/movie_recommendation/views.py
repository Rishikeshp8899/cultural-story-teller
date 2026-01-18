from django.shortcuts import render
from .rl.sarsa import select_action
from .rl.state import discretize_state

# Create your views here.
def recommend_video(event):
    s = discretize_state(event)
    a = select_action(s)

    return "EXPLORE" if a == 0 else "EXPLOIT"
