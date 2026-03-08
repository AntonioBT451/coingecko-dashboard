import { Box, Container, Typography } from '@mui/material';
import CryptoTable from './components/CryptoTable';
import CryptoChart from './components/CryptoChart';

export const App = () => {
  return (
    <Container maxWidth='lg' className=''>
      <Box sx={{ my: 4 }} >
        <Typography variant='h4' component='h1' gutterBottom className='font-bold text-cyan-950' >
          Dashboard Dinametra
        </Typography>
      </Box>

      <CryptoChart coinId='bitcoin' currency='usd' />
      <CryptoTable currency='usd' />

    </Container>
  )
};
