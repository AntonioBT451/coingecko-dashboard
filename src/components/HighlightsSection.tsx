import { Box, Typography, Stack, CircularProgress } from '@mui/material';
import { Flame } from 'lucide-react';
import { useTopGainers } from '../hooks/useTopGainers';
import GainerCard from './GainerCard';
import type { Coin } from '../types/crypto';

interface HighlightsSectionProps {
    coins: Coin[] | undefined;
    currency: string;
    isLoading: boolean;
    isError: boolean;
}

const HighlightsSection = ({ coins, currency, isLoading, isError }: HighlightsSectionProps) => {

    const { topGainers } = useTopGainers(coins || []);

    if (isLoading) return (
        <Box className="flex items-center gap-3 p-6 bg-slate-50 rounded-2xl mb-8">
            <CircularProgress size={20} />
            <Typography variant="body2" className="text-slate-500">Buscando oportunidades del mercado...</Typography>
        </Box>
    );

    if (isError) return (
        <Typography color="error" className="p-4 text-center bg-red-50 rounded-xl mb-8">
            Error al cargar Highlights. Por favor, intenta de nuevo.
        </Typography>
    );

    if (topGainers.length === 0) return null;

    return (
        <Box className="mb-10">

            {/* Título de la Sección */}
            <Box className="flex items-center gap-3 mb-5 ml-1">
                <Flame className="text-orange-500" size={24} />
                <Typography variant="h6" className="font-black text-cyan-950 uppercase tracking-widest text-sm">
                    Highlights
                </Typography>
            </Box>

            {/* Contenedor Horizontal de Tarjetas */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                className="overflow-x-auto pb-2 -mb-2"
            >
                {topGainers.map((coin) => (
                    <GainerCard key={coin.id} coin={coin} currency={currency} />
                ))}
            </Stack>
        </Box>
    );
};

export default HighlightsSection;