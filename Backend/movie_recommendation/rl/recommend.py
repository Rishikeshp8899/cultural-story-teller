from movie_recommendation.rl.sarsa import select_action
from movie_recommendation.rl.state import discretize_state
from movie_recommendation.models import VideoEventLogs

# def recommend_video(user_event):
#     user_id = user_event.get("user_id")
#     print("User ID in recommend_video:", user_id)   
#     log = (
#     VideoEventLogs.objects
#     .filter(user_id=user_id)
#     .order_by("-created_at")[:10]
# )
#     print("User Event Log:", log)
#     if not log.exists():
#         return "EXPLORE"
#     state = discretize_state(log)
#     action = select_action(state,log)
#     print("Selected Action:", action)
#     return action

def recommend_video(user_event):
    user_id = user_event.get("user_id")

    # ❌ NO SLICE HERE
    log_qs = (
        VideoEventLogs.objects
        .filter(user_id=user_id)
        .order_by("-created_at")
    )

    print("User Event Log:", log_qs[:10])  # only for debug

    if not log_qs.exists():
        return "EXPLORE"

    state = discretize_state(log_qs.first())  # 👈 pass ONE event
    action = select_action(state, log_qs)     # 👈 full QS

    print("Selected Action:", action)

    return action, {
        "message": "",
        "event": "RECOMMEND_START",
        "user_id": user_id,
        "trace_id": "trace-645380"
    }
