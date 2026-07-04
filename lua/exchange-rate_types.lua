-- Typed models for the ExchangeRate SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Latest
---@field base? string
---@field date? string
---@field rate? table
---@field time_last_updated? number

---@class LatestLoadMatch
---@field id string

local M = {}

return M
