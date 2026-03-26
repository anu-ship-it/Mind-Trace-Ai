from utils import validate_input, normalize_data, compute_behavior_score

def predict_risk(data):

    validate_input(data)

    normalized = normalize_data(data)

    score = compute_behavior_score(normalized)

    return score