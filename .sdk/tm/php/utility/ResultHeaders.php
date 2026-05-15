<?php
declare(strict_types=1);

// ExchangeRate SDK utility: result_headers

class ExchangeRateResultHeaders
{
    public static function call(ExchangeRateContext $ctx): ?ExchangeRateResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
