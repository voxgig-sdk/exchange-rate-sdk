# ExchangeRate SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ExchangeRateFeatures
  def self.make_feature(name)
    case name
    when "base"
      ExchangeRateBaseFeature.new
    when "ratelimit"
      ExchangeRateRatelimitFeature.new
    when "retry"
      ExchangeRateRetryFeature.new
    when "test"
      ExchangeRateTestFeature.new
    when "timeout"
      ExchangeRateTimeoutFeature.new
    else
      ExchangeRateBaseFeature.new
    end
  end
end
