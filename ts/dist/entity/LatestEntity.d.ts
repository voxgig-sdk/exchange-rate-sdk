import { ExchangeRateEntityBase } from '../ExchangeRateEntityBase';
import type { ExchangeRateSDK } from '../ExchangeRateSDK';
import type { Control } from '../types';
import type { Latest, LatestLoadMatch } from '../ExchangeRateTypes';
declare class LatestEntity extends ExchangeRateEntityBase<Latest> {
    constructor(client: ExchangeRateSDK, entopts: any);
    make(this: LatestEntity): LatestEntity;
    load(this: any, reqmatch?: LatestLoadMatch, ctrl?: Control): Promise<LatestEntity>;
}
export { LatestEntity };
