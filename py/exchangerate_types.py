# Typed models for the ExchangeRate SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Latest:
    base: Optional[str] = None
    date: Optional[str] = None
    rate: Optional[dict] = None
    time_last_updated: Optional[int] = None


@dataclass
class LatestLoadMatch:
    id: str

