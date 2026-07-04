# frozen_string_literal: true

# Typed models for the ExchangeRate SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Latest entity data model.
#
# @!attribute [rw] base
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] rate
#   @return [Hash, nil]
#
# @!attribute [rw] time_last_updated
#   @return [Integer, nil]
Latest = Struct.new(
  :base,
  :date,
  :rate,
  :time_last_updated,
  keyword_init: true
)

# Request payload for Latest#load.
#
# @!attribute [rw] id
#   @return [String]
LatestLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

