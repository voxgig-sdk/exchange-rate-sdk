# ExchangeRate SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ExchangeRateUtility.registrar = ->(u) {
  u.clean = ExchangeRateUtilities::Clean
  u.done = ExchangeRateUtilities::Done
  u.make_error = ExchangeRateUtilities::MakeError
  u.feature_add = ExchangeRateUtilities::FeatureAdd
  u.feature_hook = ExchangeRateUtilities::FeatureHook
  u.feature_init = ExchangeRateUtilities::FeatureInit
  u.fetcher = ExchangeRateUtilities::Fetcher
  u.make_fetch_def = ExchangeRateUtilities::MakeFetchDef
  u.make_context = ExchangeRateUtilities::MakeContext
  u.make_options = ExchangeRateUtilities::MakeOptions
  u.make_request = ExchangeRateUtilities::MakeRequest
  u.make_response = ExchangeRateUtilities::MakeResponse
  u.make_result = ExchangeRateUtilities::MakeResult
  u.make_point = ExchangeRateUtilities::MakePoint
  u.make_spec = ExchangeRateUtilities::MakeSpec
  u.make_url = ExchangeRateUtilities::MakeUrl
  u.param = ExchangeRateUtilities::Param
  u.prepare_auth = ExchangeRateUtilities::PrepareAuth
  u.prepare_body = ExchangeRateUtilities::PrepareBody
  u.prepare_headers = ExchangeRateUtilities::PrepareHeaders
  u.prepare_method = ExchangeRateUtilities::PrepareMethod
  u.prepare_params = ExchangeRateUtilities::PrepareParams
  u.prepare_path = ExchangeRateUtilities::PreparePath
  u.prepare_query = ExchangeRateUtilities::PrepareQuery
  u.result_basic = ExchangeRateUtilities::ResultBasic
  u.result_body = ExchangeRateUtilities::ResultBody
  u.result_headers = ExchangeRateUtilities::ResultHeaders
  u.transform_request = ExchangeRateUtilities::TransformRequest
  u.transform_response = ExchangeRateUtilities::TransformResponse
}
