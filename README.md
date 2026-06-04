# ExchangeRate SDK

Free, key-free currency exchange rates for 160+ ISO 4217 currencies, refreshed daily

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About ExchangeRate-API

[ExchangeRate-API](https://www.exchangerate-api.com) is a long-running currency rates service that publishes a free, key-free open access endpoint alongside its paid v6 API. The slug here wraps the no-auth endpoint at `https://open.er-api.com/v6/latest/{base}` (the upstream catalogue lists this under the API's v4-style free tier).

What you get from the API:

- Latest conversion rates for a chosen base currency against 160+ ISO 4217 three-letter codes (USD, EUR, GBP, etc.).
- Timestamps for the current rate set (`time_last_update_unix` / `_utc`) and the next scheduled refresh (`time_next_update_unix` / `_utc`).
- An end-of-life marker (`time_eol_unix`) so clients can plan migrations before an endpoint is retired.

Operational notes: rates refresh approximately once every 24 hours, so requesting more often than daily (or hourly) brings no new data and may trigger HTTP 429 responses that clear after ~20 minutes. The free tier has no API key; the separate paid v6 plans require one and offer faster refresh cadences. CORS is disabled on the open access host, so browser callers typically need a proxy.

## Try it

**TypeScript**
```bash
npm install exchange-rate
```

**Python**
```bash
pip install exchange-rate-sdk
```

**PHP**
```bash
composer require voxgig/exchange-rate-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/exchange-rate-sdk/go
```

**Ruby**
```bash
gem install exchange-rate-sdk
```

**Lua**
```bash
luarocks install exchange-rate-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ExchangeRateSDK } from 'exchange-rate'

const client = new ExchangeRateSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o exchange-rate-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "exchange-rate": {
      "command": "/abs/path/to/exchange-rate-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Latest** | Latest exchange rates for a given base currency against all supported ISO 4217 codes, served from `GET /latest/{base}` (open access host `https://open.er-api.com/v6/latest/{base}`). | `/latest/{base_currency}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from exchangerate_sdk import ExchangeRateSDK

client = ExchangeRateSDK({})


# Load a specific latest
latest, err = client.Latest(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'exchangerate_sdk.php';

$client = new ExchangeRateSDK([]);


// Load a specific latest
[$latest, $err] = $client->Latest(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/exchange-rate-sdk/go"

client := sdk.NewExchangeRateSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "ExchangeRate_sdk"

client = ExchangeRateSDK.new({})


# Load a specific latest
latest, err = client.Latest(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("exchange-rate_sdk")

local client = sdk.new({})


-- Load a specific latest
local latest, err = client:Latest(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ExchangeRateSDK.test()
const result = await client.Latest().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ExchangeRateSDK.test(None, None)
result, err = client.Latest(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ExchangeRateSDK::test(null, null);
[$result, $err] = $client->Latest(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Latest(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ExchangeRateSDK.test(nil, nil)
result, err = client.Latest(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Latest(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the ExchangeRate-API

- Upstream: [https://www.exchangerate-api.com](https://www.exchangerate-api.com)
- API docs: [https://www.exchangerate-api.com/docs/free](https://www.exchangerate-api.com/docs/free)

- Open access tier requires no API key and is free for personal or commercial currency conversion.
- Attribution required: display "Rates By Exchange Rate API" linking to https://www.exchangerate-api.com.
- Caching the response is explicitly permitted; re-distribution of the raw data is not.
- Paid v6 plans (with API key) cover higher update frequencies and additional endpoints.

---

Generated from the ExchangeRate-API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
