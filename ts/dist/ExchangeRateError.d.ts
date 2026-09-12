import { Context } from './Context';
declare class ExchangeRateError extends Error {
    isExchangeRateError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ExchangeRateError };
