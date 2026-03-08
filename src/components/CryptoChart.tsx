
import {
    XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useCoinHistory } from '../hooks/useCoinHistory';

interface Props {
    coinId: string;
    currency: string;
}

const CryptoChart = ({ coinId, currency }: Props) => {
    const { data, isLoading, isError } = useCoinHistory(coinId, currency);

    if (isLoading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>;
    if (isError) return <Typography color="error">Error al cargar el histórico.</Typography>;

    // 1. Transformar datos para Recharts
    const formattedData = data?.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' }),
        price: price,
    }));

    return (
        <Paper elevation={2} className="p-6 rounded-2xl bg-white mb-8">
            <Typography variant="h6" className="mb-4 font-bold capitalize">
                Tendencia - {coinId} (Últimos 7 días)
            </Typography>

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
                            minTickGap={20}
                        />
                        <YAxis
                            hide={true}
                            domain={['auto', 'auto']}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: '10px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            // Cambiamos el tipado de 'value' a 'any' o 'number' con validación
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