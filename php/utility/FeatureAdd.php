<?php
declare(strict_types=1);

// ExchangeRate SDK utility: feature_add

class ExchangeRateFeatureAdd
{
    public static function call(ExchangeRateContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
