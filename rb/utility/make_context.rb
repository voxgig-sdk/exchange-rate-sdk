# ExchangeRate SDK utility: make_context
require_relative '../core/context'
module ExchangeRateUtilities
  MakeContext = ->(ctxmap, basectx) {
    ExchangeRateContext.new(ctxmap, basectx)
  }
end
