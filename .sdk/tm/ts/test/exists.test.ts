
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ExchangeRateSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ExchangeRateSDK.test()
    equal(null !== testsdk, true)
  })

})
