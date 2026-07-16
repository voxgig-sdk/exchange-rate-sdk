<?php
declare(strict_types=1);

// ExchangeRate SDK base feature

class ExchangeRateBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ExchangeRateContext $ctx, array $options): void {}
    public function PostConstruct(ExchangeRateContext $ctx): void {}
    public function PostConstructEntity(ExchangeRateContext $ctx): void {}
    public function SetData(ExchangeRateContext $ctx): void {}
    public function GetData(ExchangeRateContext $ctx): void {}
    public function GetMatch(ExchangeRateContext $ctx): void {}
    public function SetMatch(ExchangeRateContext $ctx): void {}
    public function PrePoint(ExchangeRateContext $ctx): void {}
    public function PreSpec(ExchangeRateContext $ctx): void {}
    public function PreRequest(ExchangeRateContext $ctx): void {}
    public function PreResponse(ExchangeRateContext $ctx): void {}
    public function PreResult(ExchangeRateContext $ctx): void {}
    public function PreDone(ExchangeRateContext $ctx): void {}
    public function PreUnexpected(ExchangeRateContext $ctx): void {}
}
