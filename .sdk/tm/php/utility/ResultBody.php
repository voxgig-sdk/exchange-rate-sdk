<?php
declare(strict_types=1);

// ExchangeRate SDK utility: result_body

class ExchangeRateResultBody
{
    public static function call(ExchangeRateContext $ctx): ?ExchangeRateResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
