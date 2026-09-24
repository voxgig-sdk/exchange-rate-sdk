"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRateError = void 0;
class ExchangeRateError extends Error {
    isExchangeRateError = true;
    sdk = 'ExchangeRate';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ExchangeRateError = ExchangeRateError;
//# sourceMappingURL=ExchangeRateError.js.map