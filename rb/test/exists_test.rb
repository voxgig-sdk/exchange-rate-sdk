# ExchangeRate SDK exists test

require "minitest/autorun"
require_relative "../ExchangeRate_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ExchangeRateSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
