# ProjectName SDK exists test

import pytest
from exchangerate_sdk import ExchangeRateSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ExchangeRateSDK.test(None, None)
        assert testsdk is not None
