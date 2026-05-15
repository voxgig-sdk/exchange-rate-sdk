<?php
declare(strict_types=1);

// ExchangeRate SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ExchangeRateFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ExchangeRateBaseFeature();
            case "test":
                return new ExchangeRateTestFeature();
            default:
                return new ExchangeRateBaseFeature();
        }
    }
}
