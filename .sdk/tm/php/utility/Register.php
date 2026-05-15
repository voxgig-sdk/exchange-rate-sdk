<?php
declare(strict_types=1);

// ExchangeRate SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ExchangeRateUtility::setRegistrar(function (ExchangeRateUtility $u): void {
    $u->clean = [ExchangeRateClean::class, 'call'];
    $u->done = [ExchangeRateDone::class, 'call'];
    $u->make_error = [ExchangeRateMakeError::class, 'call'];
    $u->feature_add = [ExchangeRateFeatureAdd::class, 'call'];
    $u->feature_hook = [ExchangeRateFeatureHook::class, 'call'];
    $u->feature_init = [ExchangeRateFeatureInit::class, 'call'];
    $u->fetcher = [ExchangeRateFetcher::class, 'call'];
    $u->make_fetch_def = [ExchangeRateMakeFetchDef::class, 'call'];
    $u->make_context = [ExchangeRateMakeContext::class, 'call'];
    $u->make_options = [ExchangeRateMakeOptions::class, 'call'];
    $u->make_request = [ExchangeRateMakeRequest::class, 'call'];
    $u->make_response = [ExchangeRateMakeResponse::class, 'call'];
    $u->make_result = [ExchangeRateMakeResult::class, 'call'];
    $u->make_point = [ExchangeRateMakePoint::class, 'call'];
    $u->make_spec = [ExchangeRateMakeSpec::class, 'call'];
    $u->make_url = [ExchangeRateMakeUrl::class, 'call'];
    $u->param = [ExchangeRateParam::class, 'call'];
    $u->prepare_auth = [ExchangeRatePrepareAuth::class, 'call'];
    $u->prepare_body = [ExchangeRatePrepareBody::class, 'call'];
    $u->prepare_headers = [ExchangeRatePrepareHeaders::class, 'call'];
    $u->prepare_method = [ExchangeRatePrepareMethod::class, 'call'];
    $u->prepare_params = [ExchangeRatePrepareParams::class, 'call'];
    $u->prepare_path = [ExchangeRatePreparePath::class, 'call'];
    $u->prepare_query = [ExchangeRatePrepareQuery::class, 'call'];
    $u->result_basic = [ExchangeRateResultBasic::class, 'call'];
    $u->result_body = [ExchangeRateResultBody::class, 'call'];
    $u->result_headers = [ExchangeRateResultHeaders::class, 'call'];
    $u->transform_request = [ExchangeRateTransformRequest::class, 'call'];
    $u->transform_response = [ExchangeRateTransformResponse::class, 'call'];
});
