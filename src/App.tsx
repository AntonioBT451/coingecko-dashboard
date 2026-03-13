import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Container, Typography } from '@mui/material';
import CryptoTable from './components/CryptoTable';
import CryptoChart from './components/CryptoChart';
import { useTopCoins } from './hooks/useTopCoins';
import SearchBar from './components/SearchBar';
import CurrencySelector from './components/CurrencySelector';
import HighlightsSection from './components/HighlightsSection';

export const App = () => {

  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [currency, setCurrency] = useState('usd');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: coins, isLoading, isError } = useTopCoins(currency);

  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      // Si presiona '/', enfoca el buscador automáticamente
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[placeholder*="Buscar"]')?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  const filteredCoins = useMemo(() => {
    if (!coins) return [];

    const searchLower = searchTerm.toLowerCase().trim();
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchLower) ||
      coin.symbol.toLowerCase().includes(searchLower)
    );
  }, [coins, searchTerm]);

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="error"
          variant="filled"
          action={
            <button onClick={() => window.location.reload()}>
              Reintentar
            </button>
          }
        >
          'Error al cargar los datos. Por favor, intenta de nuevo.'
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' className='pb-20'>
      <Box sx={{ my: 4 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Typography variant='h4' component='h1' gutterBottom className='font-bold text-cyan-950' >
          Dashboard Dinametra
        </Typography>

        <Box className="w-full md:w-1/3">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <CurrencySelector value={currency} onChange={setCurrency} />
        </Box>
      </Box>

      <HighlightsSection coins={coins} currency={currency} isError={isError} isLoading={isLoading} />

      <CryptoChart coinId={selectedCoin} currency={currency} />

      <CryptoTable
        coins={filteredCoins}
        selectedCoin={selectedCoin}
        onCoinSelect={setSelectedCoin}
        currency={currency}
        isLoading={isLoading}
        isError={isError}
      />

    </Container>
  )
};
