package core

type ExchangeRateError struct {
	IsExchangeRateError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewExchangeRateError(code string, msg string, ctx *Context) *ExchangeRateError {
	return &ExchangeRateError{
		IsExchangeRateError: true,
		Sdk:              "ExchangeRate",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ExchangeRateError) Error() string {
	return e.Msg
}
