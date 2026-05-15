<?php
declare(strict_types=1);

// ExchangeRate SDK utility: prepare_body

class ExchangeRatePrepareBody
{
    public static function call(ExchangeRateContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
