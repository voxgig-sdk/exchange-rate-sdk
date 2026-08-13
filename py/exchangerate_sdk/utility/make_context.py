# ExchangeRate SDK utility: make_context

from exchangerate_sdk.core.context import ExchangeRateContext


def make_context_util(ctxmap, basectx):
    return ExchangeRateContext(ctxmap, basectx)
