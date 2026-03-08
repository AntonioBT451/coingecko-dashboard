import type { ChartData, Coin } from "../types/crypto";
import { coingeckoApi } from "./coingeckoApi";

export const getTopCoins = async (currency: string = 'usd'): Promise<Coin[]> => {
    const { data } = await coingeckoApi.get<Coin[]>('/coins/markets', {
        params: {
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
        },
    })
    return data;
};

export const getCoinHistory = async (id: string, currency: string = 'usd'): Promise<ChartData> => {
    const { data } = await coingeckoApi.get<ChartData>(`/coins/${id}/market_chart`, {
        params: {
            vs_currency: currency,
            days: 7,
            interval: 'daily',
        },
    });

    return data;
};
