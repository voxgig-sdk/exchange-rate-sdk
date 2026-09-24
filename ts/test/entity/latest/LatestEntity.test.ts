

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ExchangeRateSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('LatestEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EXCHANGE_RATE_TEST_LIVE=TRUE.
  afterEach(liveDelay('EXCHANGE_RATE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ExchangeRateSDK.test()
    const ent = testsdk.Latest()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EXCHANGE_RATE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'latest.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"latest","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /latest/{base_currency}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"base_currency","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/latest/{base_currency}","q":{"exist":["id"]},"r":{"param":{"base_currency":"id"}},"s":[{"lit":"latest"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.rates`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"latest","name__orig":"latest","Name":"Latest","name_":"latest","name-":"latest","NAME":"LATEST","index$":0}, {"active":true,"entity":"latest","key$":"BasicLatestFlow","kind":"basic","name":"BasicLatestFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"latest_ref01","srcdatavar":"latest_ref01_data","suffix":"_dt0"},"m":{"id":"latest01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-latest_ref01"}}],"index$":0}]}, 'Latest', {"GET /latest/{base_currency}":{"protocol":"http","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"base":{"type":"string","description":"The currency code you supplied as base in your request","example":"USD"},"date":{"type":"string","description":"The date these exchange rates are for"},"time_last_updated":{"type":"integer","description":"The epoch time this set of exchange rates was generated","example":1556293443},"rates":{"type":"object","description":"Each supported currency code in terms of the base currency","additionalProperties":{"type":"number","format":"double","key$":"additionalProperties"}}}}}}},"404":{"description":"Currency code not supported","content":{"application/json":{"schema":{"type":"object","properties":{"result":{"type":"string"},"error_type":{"type":"string"}}}}}}},"parameters":[{"name":"base_currency","in":"path","description":"**Base Currency**. *Example: USD*. You an use any of the ISO 4217 currency codes we support. See https://www.exchangerate-api.com/docs/supported-currencies","schema":{"type":"string"},"required":true,"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let latest_ref01_data = Object.values(setup.data.existing.latest)[0] as any

    // LOAD
    const latest_ref01_ent = client.Latest()
    const latest_ref01_match_dt0: any = {}
    latest_ref01_match_dt0.id = latest_ref01_data.id
    const latest_ref01_data_dt0 = (await latest_ref01_ent.load(latest_ref01_match_dt0)).data()
    assert(latest_ref01_data_dt0.id === latest_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/latest/LatestTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ExchangeRateSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['latest01','latest02','latest03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EXCHANGE_RATE_TEST_LATEST_ENTID': idmap,
    'EXCHANGE_RATE_TEST_LIVE': 'FALSE',
    'EXCHANGE_RATE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['EXCHANGE_RATE_TEST_LATEST_ENTID']

  const live = 'TRUE' === env.EXCHANGE_RATE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EXCHANGE_RATE_TEST_LATEST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ExchangeRateSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.EXCHANGE_RATE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
