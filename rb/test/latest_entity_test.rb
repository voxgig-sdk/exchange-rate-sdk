# Latest entity test

require "minitest/autorun"
require "json"
require_relative "../ExchangeRate_sdk"
require_relative "runner"

class LatestEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ExchangeRateSDK.test(nil, nil)
    ent = testsdk.Latest(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ExchangeRateConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ExchangeRateSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Latest(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = latest_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "latest." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["latest01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via EXCHANGE_RATE_TEST_LATEST_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "latest") do
        [{ "id" => setup[:idmap]["latest01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    latest_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.latest")))
    latest_ref01_data = nil
    if latest_ref01_data_raw.length > 0
      latest_ref01_data = Helpers.to_map(latest_ref01_data_raw[0][1])
    end

    # LOAD
    latest_ref01_ent = client.Latest(nil)
    latest_ref01_match_dt0 = {
      "id" => latest_ref01_data["id"],
    }
    latest_ref01_data_dt0_loaded = latest_ref01_ent.load(latest_ref01_match_dt0, nil)
    latest_ref01_data_dt0_load_result = Helpers.to_map(latest_ref01_data_dt0_loaded.respond_to?(:data_get) ? latest_ref01_data_dt0_loaded.data_get : latest_ref01_data_dt0_loaded)
    assert !latest_ref01_data_dt0_load_result.nil?
    assert_equal latest_ref01_data_dt0_load_result["id"], latest_ref01_data["id"]

  end
end

def latest_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "latest", "LatestTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ExchangeRateSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["latest01", "latest02", "latest03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["EXCHANGE_RATE_TEST_LATEST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EXCHANGE_RATE_TEST_LATEST_ENTID" => idmap,
    "EXCHANGE_RATE_TEST_LIVE" => "FALSE",
    "EXCHANGE_RATE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["EXCHANGE_RATE_TEST_LATEST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["EXCHANGE_RATE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = ExchangeRateSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["EXCHANGE_RATE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["EXCHANGE_RATE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
