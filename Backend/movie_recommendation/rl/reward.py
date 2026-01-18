

def reward_from_event(event):

    reward = 0.0

    completion = event.get("completion_rate", 0)
    liked = event.get("like", False)
    commented = event.get("comment", False)
    shared = event.get("share", False)
    skipped = event.get("skipped", False)

    reward += completion * 2.0

    if liked:
        reward += 1.0
    if commented:
        reward += 2.0
    if shared:
        reward += 3.0

    if skipped:
        reward -= 2.5

    return reward
