import { useMemo } from 'react';
import type { Coin } from '../types/crypto';

export const useTopGainers = (coins: Coin[]) => {

    const topGainers = useMemo(() => {
        if (!coins) return [];

        // 1. Filtro: Solo monedas con subida > 1%
        // 2. Orden: De mayor a menor ganancia
        // 3. Limite: Top 4
        return coins
            .filter((coin: Coin) => coin.price_change_percentage_24h > 1)
            .sort((a: Coin, b: Coin) => b.price_change_percentage_24h - a.price_change_percentage_24h)
            .slice(0, 4);
    }, [coins]);

    return {
        topGainers,
    };
};