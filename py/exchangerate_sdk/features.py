# ExchangeRate SDK feature factory

from exchangerate_sdk.feature.base_feature import ExchangeRateBaseFeature
from exchangerate_sdk.feature.ratelimit_feature import ExchangeRateRatelimitFeature
from exchangerate_sdk.feature.retry_feature import ExchangeRateRetryFeature
from exchangerate_sdk.feature.test_feature import ExchangeRateTestFeature
from exchangerate_sdk.feature.timeout_feature import ExchangeRateTimeoutFeature


_FEATURES = {
    "base": lambda: ExchangeRateBaseFeature(),
    "ratelimit": lambda: ExchangeRateRatelimitFeature(),
    "retry": lambda: ExchangeRateRetryFeature(),
    "test": lambda: ExchangeRateTestFeature(),
    "timeout": lambda: ExchangeRateTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
