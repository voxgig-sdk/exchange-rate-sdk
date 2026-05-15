# ExchangeRate SDK utility: feature_add
module ExchangeRateUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
