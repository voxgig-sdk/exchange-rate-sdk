export interface Latest {
    base?: string;
    date?: string;
    id?: string;
    rates?: Record<string, any>;
    time_last_updated?: number;
}
export interface LatestLoadMatch {
    id: string;
}
