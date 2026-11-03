# ExchangeRate SDK utility: prepare_body
require_relative 'media'
module ExchangeRateUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ExchangeRateUtilities.raw_body(ctx.reqdata) if ExchangeRateUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
