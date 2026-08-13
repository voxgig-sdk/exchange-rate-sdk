# ExchangeRate SDK utility: make_context

from projectname_sdk.core.context import ExchangeRateContext


def make_context_util(ctxmap, basectx):
    return ExchangeRateContext(ctxmap, basectx)
