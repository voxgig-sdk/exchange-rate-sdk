-- ExchangeRate SDK error

local ExchangeRateError = {}
ExchangeRateError.__index = ExchangeRateError


function ExchangeRateError.new(code, msg, ctx)
  local self = setmetatable({}, ExchangeRateError)
  self.is_sdk_error = true
  self.sdk = "ExchangeRate"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ExchangeRateError:error()
  return self.msg
end


function ExchangeRateError:__tostring()
  return self.msg
end


return ExchangeRateError
