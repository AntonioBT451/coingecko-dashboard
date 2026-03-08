import axios from 'axios';

export const coingeckoApi = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
    headers: {
        'Accept': 'application/json',
        'x-cg-pro-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
    },
});