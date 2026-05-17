package voxgigexchangeratesdk

import (
	"github.com/voxgig-sdk/exchange-rate-sdk/go/core"
	"github.com/voxgig-sdk/exchange-rate-sdk/go/entity"
	"github.com/voxgig-sdk/exchange-rate-sdk/go/feature"
	_ "github.com/voxgig-sdk/exchange-rate-sdk/go/utility"
)

// Type aliases preserve external API.
type ExchangeRateSDK = core.ExchangeRateSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ExchangeRateEntity = core.ExchangeRateEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ExchangeRateError = core.ExchangeRateError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewLatestEntityFunc = func(client *core.ExchangeRateSDK, entopts map[string]any) core.ExchangeRateEntity {
		return entity.NewLatestEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewExchangeRateSDK = core.NewExchangeRateSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
