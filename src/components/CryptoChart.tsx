import { useState } from 'react';
import {
    XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { Box, Typography, CircularProgress, Paper, Stack, Chip } from '@mui/material';
import { useCoinHistory } from '../hooks/useCoinHistory';

interface CryptoChartProps {
    coinId: string;
    currency: string;
}

const CryptoChart = ({ coinId, currency }: CryptoChartProps) => {
    const [days, setDays] = useState(7);

    const { data, isLoading, isError } = useCoinHistory(coinId, currency, days);

    const timeOptions = [
        { label: '1 Semana', value: 7 },
        { label: '1 Mes', value: 30 },
        { label: '1 Año', value: 365 },
    ];

    if (isLoading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>;
    if (isError) return <Typography color="error">Error al cargar el histórico.</Typography>;

    const formattedData = data?.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }),
        price: price,
    }));

    return (
        <Paper elevation={2} className="p-6 rounded-2xl bg-white mb-8">
            <Box className="flex flex-col mb-6">
                <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Typography variant="h5" className="font-black text-slate-800 capitalize">
                        {coinId}
                    </Typography>

                    <Stack direction="row" spacing={1} className="flex-wrap">
                        {timeOptions.map((option) => (
                            <Chip
                                key={option.value}
                                label={option.label}
                                onClick={() => setDays(option.value)}
                                color={days === option.value ? "primary" : "default"}
                                variant={days === option.value ? "filled" : "outlined"}
                                size="medium"
                                sx={{
                                    borderRadius: '8px', fontWeight: 'bold', '&:hover': {
                                        backgroundColor: days === option.value ? 'primary.dark' : 'action.hover'
                                    }
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                {formattedData && formattedData.length > 0 && (
                    <Box className="flex items-baseline gap-2">
                        <Typography variant="h6" className="font-bold text-blue-700">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency,
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }).format(formattedData[formattedData.length - 1].price)}
                        </Typography>
                        <Typography variant="subtitle2" className="text-slate-400 font-medium">
                            ({currency.toUpperCase()})
                        </Typography>
                    </Box>
                )}
            </Box>


            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#94a3b8' }}
                            minTickGap={30}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            tick={{ fontSize: 12, fill: '#94a3b8' }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => {
                                if (value >= 1000) {
                                    return `$${(value / 1000).toFixed(1)}k`;
                                }
                                return `$${value}`;
                            }}
                            width={60}
                            domain={['auto', 'auto']}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: '10px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}

                            formatter={(value: any) => {
                                const numericValue = Number(value);
                                return [
                                    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(numericValue),
                                    'Precio'
                                ];
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Paper>
    );
};

export default CryptoChart;