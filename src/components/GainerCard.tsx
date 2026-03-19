import { Box, Typography, Avatar, Paper } from '@mui/material';
import { TrendingUp } from 'lucide-react';
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
            className="flex flex-col p-4 gap-2"
            elevation={3}
            sx={{
                height: '100%',
                width: '256px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '1rem',
                '& .sparkline-container': {
                    flex: 1,
                    minHeight: 0,
                    width: '100%',
                    marginTop: 'auto'
                }
            }}
        >
            {/* Header: Logo, Nombre, Precio, Procentaje */}
            <Box className="flex justify-between items-start gap-3">
                <Box className="flex items-center gap-3">
                    <Avatar src={coin.image} alt={coin.name} className="w-10 h-10" />
                    <Box>
                        <Typography variant="body1" className="font-bold text-lg leading-tight">
                            {coin.name}
                        </Typography>
                        <Typography variant="caption" className="uppercase text-neutral-500 font-medium tracking-wide">
                            {coin.symbol}
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h4" className="font-black tracking-tight">
                        {formatter.format(coin.current_price)}
                    </Typography>

                    <Box className="flex items-center gap-1.5 text-blue-700">
                        <TrendingUp size={16} />
                        <Typography variant="body2" className="font-bold">
                            +{coin.price_change_percentage_24h.toFixed(2)}%
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Mini Gráfico (Sparkline) */}
            <Box className="sparkline-container">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparklineData}>
                        <YAxis hide domain={['auto', 'auto']} />

                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#3b82f6"
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