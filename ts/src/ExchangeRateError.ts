
import { Context } from './Context'


class ExchangeRateError extends Error {

  isExchangeRateError = true

  sdk = 'ExchangeRate'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ExchangeRateError
}

