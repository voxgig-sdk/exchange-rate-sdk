package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewLatestEntityFunc func(client *ExchangeRateSDK, entopts map[string]any) ExchangeRateEntity

