<?php
declare(strict_types=1);

// ExchangeRate SDK exists test

require_once __DIR__ . '/../exchangerate_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ExchangeRateSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
