# Latest entity test

require "minitest/autorun"
require "json"
require_relative "../ExchangeRate_sdk"
require_relative "runner"

class LatestEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ExchangeRateSDK.test(nil, nil)
    ent = testsdk.Latest(nil)
    assert !ent.nil?
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
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set EXCHANGERATE_TEST_LATEST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    latest_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.latest")))
    latest_ref01_data = nil
    if latest_ref01_data_raw.length > 0
      latest_ref01_data = Helpers.to_map(latest_ref01_data_raw[0][1])
    end

    # LOAD
    latest_ref01_ent = client.Latest(nil)
    latest_ref01_match_dt0 = {}
    latest_ref01_data_dt0_loaded, err = latest_ref01_ent.load(latest_ref01_match_dt0, nil)
    assert_nil err
    assert !latest_ref01_data_dt0_loaded.nil?

  end
end

def latest_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "latest", "LatestTestData.json")
  entity_data_source = File.read(entity_data_file)
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

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["EXCHANGERATE_TEST_LATEST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "EXCHANGERATE_TEST_LATEST_ENTID" => idmap,
    "EXCHANGERATE_TEST_LIVE" => "FALSE",
    "EXCHANGERATE_TEST_EXPLAIN" => "FALSE",
    "EXCHANGERATE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["EXCHANGERATE_TEST_LATEST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["EXCHANGERATE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["EXCHANGERATE_APIKEY"],
      },
      extra || {},
    ])
    client = ExchangeRateSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["EXCHANGERATE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["EXCHANGERATE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
