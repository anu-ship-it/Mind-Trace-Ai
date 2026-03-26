from utils import validate_input, normalize_data
from ai.risk_model import RiskModel

model = RiskModel()

def predict_risk(data):

    validate_input(data)

    features = normalize_data(data)

    score = model.predict(features)

    return score
