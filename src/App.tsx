import { useMemo, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CryptoTable from './components/CryptoTable';
import CryptoChart from './components/CryptoChart';
import { useTopCoins } from './hooks/useTopCoins';
import SearchBar from './components/SearchBar';
import CurrencySelector from './components/CurrencySelector';

export const App = () => {

  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [currency, setCurrency] = useState('usd');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: coins, isLoading, isError } = useTopCoins(currency);

  const filteredCoins = useMemo(() => {
    if (!coins) return [];

    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coins, searchTerm]);

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
