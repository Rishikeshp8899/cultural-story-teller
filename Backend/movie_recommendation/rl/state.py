# rl/state.py

def discretize_state(event):
    completion = event.completion_rate or 0
    watch_time = event.watch_time or 0
    position = event.session_position or 0

    completion_bucket = int(completion * 10)
    watch_bucket = min(watch_time // 30, 10)
    position_bucket = min(position, 10)

    return (completion_bucket, watch_bucket, position_bucket)

