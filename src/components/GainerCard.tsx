import { Box, Typography, Avatar, Paper } from '@mui/material';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import type { Coin } from '../types/crypto';

interface Props {
    coin: Coin;
    currency: string;
}

const GainerCard = ({ coin, currency }: Props) => {
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency });

    const sparklineData = coin.sparkline_in_7d?.price.map(price => ({ price })) || [];

    return (
        <Paper
            elevation={0}
            className="p-5 rounded-3xl bg-[#111111] text-white flex flex-col gap-4 min-w-64 flex-1 border border-neutral-800"
        >
            {/* Header: Logo, Nombre, Icono Tendencia */}
            <Box className="flex justify-between items-start">
                <Box className="flex items-center gap-3">
                    <Avatar src={coin.image} alt={coin.name} className="w-10 h-10 border border-neutral-700 bg-neutral-900" />
                    <Box>
                        <Typography variant="body1" className="font-bold text-lg leading-tight">
                            {coin.name}
                        </Typography>
                        <Typography variant="caption" className="uppercase text-neutral-500 font-medium tracking-wide">
                            {coin.symbol}
                        </Typography>
                    </Box>
                </Box>

                <Box className="bg-[#21e8c0] text-[#0a0a0a] p-2 rounded-full shadow-lg shadow-[#21e8c033]">
                    <ArrowUpRight size={20} strokeWidth={3} />
                </Box>
            </Box>

            {/* Precio y Porcentaje */}
            <Box>
                <Typography variant="h4" className="font-black tracking-tight mb-1">
                    {formatter.format(coin.current_price)}
                </Typography>

                <Box className="flex items-center gap-1.5 text-[#21e8c0]">
                    <TrendingUp size={16} />
                    <Typography variant="body2" className="font-bold">
                        +{coin.price_change_percentage_24h.toFixed(2)}%
                    </Typography>
                </Box>
            </Box>

            {/* Mini Gráfico (Sparkline) */}
            <Box className="h-16 w-full -mb-2 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparklineData}>
                        <YAxis hide domain={['auto', 'auto']} />

                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#21e8c0" // Color Cyan de la imagen
                            strokeWidth={2}
                            dot={false}
                            activeDot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

export default GainerCard;