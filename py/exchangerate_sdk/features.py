# ExchangeRate SDK feature factory

from exchangerate_sdk.feature.base_feature import ExchangeRateBaseFeature
from exchangerate_sdk.feature.test_feature import ExchangeRateTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ExchangeRateBaseFeature(),
        "test": lambda: ExchangeRateTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
