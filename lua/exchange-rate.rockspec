package = "voxgig-sdk-exchange-rate"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/exchange-rate-sdk.git"
}
description = {
  summary = "ExchangeRate SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["exchange-rate_sdk"] = "exchange-rate_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
