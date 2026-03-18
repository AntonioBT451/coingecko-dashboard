import { useEffect, useMemo, useState } from 'react';
import { Alert, Container, Paper, Typography } from '@mui/material';
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
    <main className="w-screen h-screen overflow-hidden p-3">

      {/* Grid principal */}
      <div className="grid grid-cols-2 grid-rows-13 gap-3 w-full h-full">

        {/* Header */}
        <header className="col-span-1 row-span-1 flex items-center justify-center">
          <Typography variant='h4' className='font-black tracking-tighter text-cyan-900'>
            Crypto Dashboard
          </Typography>
        </header>

        {/* Panel derecho */}
        <Paper elevation={3} sx={{ borderRadius: '1rem' }} className="col-span-1 row-span-13 p-3">
          <div className="grid grid-cols-2 grid-rows-10 gap-3 w-full h-full">
            <div className="col-span-1 row-span-1">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div className="col-span-1 row-span-1 justify-items-end">
              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="col-span-2 row-span-9 min-h-0 overflow-hidden">
              <CryptoTable
                coins={filteredCoins}
                selectedCoin={selectedCoin}
                onCoinSelect={setSelectedCoin}
                currency={currency}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
          </div>
        </Paper>

        {/* Panel izquierdo superior */}
        <div className="col-span-1 row-span-8 bg-white rounded-xl">
          <CryptoChart coinId={selectedCoin} currency={currency} />
        </div>

        {/* Panel izquierdo inferior */}
        <div className="col-span-1 row-span-4 ">
          <HighlightsSection coins={coins} currency={currency} isError={isError} isLoading={isLoading} />
        </div>

      </div>
    </main>
  )
};
