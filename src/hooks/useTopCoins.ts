import { useQuery } from "@tanstack/react-query"
import { getTopCoins } from "../api/services"

export const useTopCoins = (currency: string) => {
  return useQuery({
    queryKey: ['topCoins', currency],
    queryFn: () => getTopCoins(currency),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
