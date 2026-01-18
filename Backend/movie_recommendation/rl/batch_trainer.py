import numpy as np
from movie_recommendation.rl.sarsa import Q, update, select_action
from movie_recommendation.rl.state import discretize_state
from movie_recommendation.rl.reward import reward_from_event

from movie_recommendation.models import VideoStats,VideoEventLogs
import numpy as np
import os
Q_TABLE_PATH = "/model/q_table.npy"  

BATCH_SIZE = 5000

def train_last_5_min():
    global Q
    if os.path.exists(Q_TABLE_PATH):
        Q = np.load(Q_TABLE_PATH, allow_pickle=True)
        print("Loaded existing Q-table")
    else:
        print("No existing Q-table found, starting fresh")

    # Get events
    events = VideoEventLogs.objects.order_by("created_at").values()[:BATCH_SIZE]

    if len(events) < 2:
        return

    for i in range(len(events) - 1):
        cur = events[i]
        nxt = events[i + 1]

        s = discretize_state(cur)
        a = cur["action"]

        r = reward_from_event(cur)

        s_next = discretize_state(nxt)
        a_next = select_action(s_next)

        update(s, a, r, s_next, a_next)

    # Save Q-table after training
    np.save(Q_TABLE_PATH, Q)
    print("Q-table updated and saved")
