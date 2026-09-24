
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ExchangeRateSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ExchangeRateSDK.test()
    equal(testsdk instanceof ExchangeRateSDK, true,
      'ExchangeRateSDK.test() must return a client synchronously')
  })

})
