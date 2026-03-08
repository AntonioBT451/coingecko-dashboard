import { useQuery } from "@tanstack/react-query";
import { getCoinHistory } from "../api/services";


export const useCoinHistory = (coinId: string, currency: string) => {
    return useQuery({
        queryKey: ['coinHistory', coinId, currency],
        queryFn: () => getCoinHistory(coinId, currency),
        enabled: !!coinId,
    });
};