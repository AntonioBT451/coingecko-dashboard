import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTopGainers } from '../hooks/useTopGainers';
import GainerCard from './GainerCard';
import type { Coin } from '../types/crypto';

interface HighlightsSectionProps {
    coins: Coin[] | undefined;
    currency: string;
    isLoading: boolean;
    isError: boolean;
}

const HighlightsSection = ({ coins = [], currency, isLoading, isError }: HighlightsSectionProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const { topGainers } = useTopGainers(coins);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (isLoading) return (
        <Box className="flex items-center justify-center h-full gap-3 p-6 bg-slate-50 rounded-xl">
            <CircularProgress size={20} />
            <Typography variant="body2" className="text-slate-500">Buscando oportunidades del mercado...</Typography>
        </Box>
    );

    if (isError) return (
        <Typography color="error" className="p-4 text-center bg-red-50 rounded-xl h-full flex items-center justify-center">
            Error al cargar Highlights. Por favor, intenta de nuevo.
        </Typography>
    );

    if (topGainers.length === 0) return null;

    return (
        <Box className="relative h-full flex items-center">
            {/* Botón izquierdo */}
            {showLeftButton && (
                <IconButton
                    onClick={() => scroll('left')}
                    className="absolute left-0 z-10 bg-white  hover:bg-gray-50"
                    sx={{
                        boxShadow: 4,
                        position: 'absolute',
                        left: 0,
                        transform: 'translateY(-50%)',
                        top: '50%',
                        '&:hover': { bgcolor: 'white' }
                    }}
                >
                    <ChevronLeft />
                </IconButton>
            )}

            {/* Botón derecho */}
            {showRightButton && (
                <IconButton
                    onClick={() => scroll('right')}
                    className="absolute right-0 z-10 bg-white hover:bg-gray-50"
                    sx={{
                        boxShadow: 4,
                        position: 'absolute',
                        right: 0,
                        transform: 'translateY(-50%)',
                        top: '50%',
                        '&:hover': { bgcolor: 'white' }
                    }}
                >
                    <ChevronRight />
                </IconButton>
            )}

            {/* Contenedor desplazable */}
            <Box
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="overflow-x-auto scrollbar-hide flex gap-3 p-1"
                sx={{
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    height: '100%',
                    alignItems: 'stretch'
                }}
            >
                {topGainers.map((coin) => (
                    <Box key={coin.id} className="shrink-0 first:ml-0 last:mr-0"
                        sx={{
                            borderRadius: '1rem',
                            height: '100%',
                            display: 'flex'
                        }}
                    >
                        <GainerCard
                            coin={coin}
                            currency={currency}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default HighlightsSection;