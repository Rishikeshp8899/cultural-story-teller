from movie_recommendation.rl.sarsa import update, select_action
from movie_recommendation.rl.state import discretize_state
from movie_recommendation.rl.reward import reward_from_event

def train_from_event(prev_event, new_event):
    s = discretize_state(prev_event)
    a = prev_event["action"]

    r = reward_from_event(new_event)
    s_next = discretize_state(new_event)
    a_next = select_action(s_next)

    update(s, a, r, s_next, a_next)
