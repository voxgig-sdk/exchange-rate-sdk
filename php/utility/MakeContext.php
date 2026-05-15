<?php
declare(strict_types=1);

// ExchangeRate SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ExchangeRateMakeContext
{
    public static function call(array $ctxmap, ?ExchangeRateContext $basectx): ExchangeRateContext
    {
        return new ExchangeRateContext($ctxmap, $basectx);
    }
}
