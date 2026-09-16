

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"latest","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"base_currency","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /latest/{base_currency}","json":"{\"parameters\":[{\"description\":\"**Base Currency**. *Example: USD*. You an use any of the ISO 4217 currency codes we support. See https://www.exchangerate-api.com/docs/supported-currencies\",\"in\":\"path\",\"name\":\"base_currency\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"base\":{\"description\":\"The currency code you supplied as base in your request\",\"example\":\"USD\",\"type\":\"string\"},\"date\":{\"description\":\"The date these exchange rates are for\",\"type\":\"string\"},\"rates\":{\"additionalProperties\":{\"format\":\"double\",\"type\":\"number\"},\"description\":\"Each supported currency code in terms of the base currency\",\"type\":\"object\"},\"time_last_updated\":{\"description\":\"The epoch time this set of exchange rates was generated\",\"example\":1556293443,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error_type\":{\"type\":\"string\"},\"result\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Currency code not supported\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/latest/{base_currency}","rename":{"param":{"base_currency":"id"}},"segments":[{"lit":"latest"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.rates`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"latest","name__orig":"latest","Name":"Latest","name_":"latest","name-":"latest","NAME":"LATEST","index$":0}, {"active":true,"entity":"latest","key$":"BasicLatestFlow","kind":"basic","name":"BasicLatestFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"latest_ref01","srcdatavar":"latest_ref01_data","suffix":"_dt0"},"match":{"id":"latest01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-latest_ref01"}}],"index$":0}]}, 'Latest')
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
  
