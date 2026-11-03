package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/exchange-rate-sdk/go"
	"github.com/voxgig-sdk/exchange-rate-sdk/go/core"

	vs "github.com/voxgig-sdk/exchange-rate-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const latestEntityLiveStrict = true


func TestLatestEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Latest(nil)
		if ent == nil {
			t.Fatal("expected non-nil LatestEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Latest(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ExchangeRateError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := latestBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "latest." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"latest01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, latestEntityLiveStrict, "Live entity test blocked: needs %s via EXCHANGE_RATE_TEST_LATEST_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, latestEntityLiveStrict, setup.data, "latest", func() (any, error) {
				return []any{map[string]any{"id": setup.idmap["latest01"]}}, nil
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		latestRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.latest")))
		var latestRef01Data map[string]any
		if len(latestRef01DataRaw) > 0 {
			latestRef01Data = core.ToMapAny(latestRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = latestRef01Data

		// LOAD
		latestRef01Ent := client.Latest(nil)
		latestRef01MatchDt0 := map[string]any{
			"id": latestRef01Data["id"],
		}
		latestRef01DataDt0Loaded, err := latestRef01Ent.Load(latestRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		latestRef01DataDt0LoadResult := core.ToMapAny(entityData(latestRef01DataDt0Loaded))
		if latestRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if latestRef01DataDt0LoadResult["id"] != latestRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func latestBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "latest", "LatestTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read latest test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse latest test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"latest01", "latest02", "latest03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("EXCHANGE_RATE_TEST_LATEST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"EXCHANGE_RATE_TEST_LATEST_ENTID": idmap,
		"EXCHANGE_RATE_TEST_LIVE":      "FALSE",
		"EXCHANGE_RATE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["EXCHANGE_RATE_TEST_LATEST_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["EXCHANGE_RATE_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewExchangeRateSDK(core.ToMapAny(mergedOpts))
	}

	live := env["EXCHANGE_RATE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["EXCHANGE_RATE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
