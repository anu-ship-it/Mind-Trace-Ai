def validate_input(data):
    """
    Ensure all required fields are present and valid
    """

    required_fields = ["sleep_hours", "activity_level", "sentiment"]

    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing field: {field}")

    if not (0 <= data["sleep_hours"] <= 24):
        raise ValueError("Sleep hours must be between 0 and 24")

    if not (0 <= data["activity_level"] <= 10):
        raise ValueError("Activity level must be between 0 and 10")

    if data["sentiment"] not in [-1, 1]:
        raise ValueError("Sentiment must be -1 or 1")

    return True


def normalize_data(data):
    """
    Normalize inputs to scale (0–1)
    """

    return {
        "sleep": data["sleep_hours"] / 24,
        "activity": data["activity_level"] / 10,
        "sentiment": 0 if data["sentiment"] == -1 else 1
    }


def compute_behavior_score(normalized):
    """
    Convert normalized inputs into weighted score
    """

    sleep_score = (1 - normalized["sleep"]) * 40
    activity_score = (1 - normalized["activity"]) * 30
    sentiment_score = (1 - normalized["sentiment"]) * 30

    total = sleep_score + activity_score + sentiment_score

    return min(int(total), 100)


def generate_status(score):
    """
    Convert score into human-readable status
    """

    if score < 30:
        return "Healthy"

    elif score < 60:
        return "Mild Stress"

    else:
        return "High Risk"