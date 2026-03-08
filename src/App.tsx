import { Box, Container, Typography } from '@mui/material';
import CryptoTable from './components/CryptoTable';

export const App = () => {
  return (
    <Container maxWidth='lg' className=''>
      <Box sx={{ my: 4 }} >
        <Typography variant='h4' component='h1' gutterBottom className='font-bold text-cyan-950' >
          Dashboard Dinametra
        </Typography>
      </Box>

      <CryptoTable currency='usd' />
    </Container>
  )
};
