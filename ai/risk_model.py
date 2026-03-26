import numpy as np

class RiskModel:

    def __init__(self):
        self.weights = {
            "sleep": -0.5,
            "activity": -0.3,
            "sentiment": -0.8
        }
        self.bias = 1.0

    def predict(self, features):
        """"
        features = {
            "sleep": 0.2,
            "activity": 0.3,
            "sentiment": 0
        }
        """

        score = (
            features["sleep"] * self.weights["sleep"] +
            features["activity"] * self.weights["activity"] +
            features["sentiment"] * self.weights["sentiment"] +
            self.bias
        )

        risk_prob = 1 / (1 + np.exp(-score))

        return int(risk_prob * 100)
    