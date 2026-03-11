import { useQuery } from "@tanstack/react-query";
import { getCoinHistory } from "../api/services";

export const useCoinHistory = (coinId: string, currency: string, days: number) => {
    return useQuery({
        queryKey: ['coinHistory', coinId, currency, days],
        queryFn: () => getCoinHistory(coinId, currency, days),
        enabled: !!coinId,
        retry: false,
    });
};