import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Avatar, Box, Typography
} from '@mui/material';
import type { Coin } from '../types/crypto';

interface CryptoTableProps {
    coins: Coin[];
    selectedCoin: string;
    currency: string;
    onCoinSelect: (id: string) => void;
    isLoading: boolean;
    isError: boolean;
}

const CryptoTable = ({ coins, selectedCoin, currency, onCoinSelect, isLoading, isError }: CryptoTableProps) => {

    if (isLoading) return <Typography>Cargando datos del mercado...</Typography>;
    if (isError) return <Typography color="error">Error al conectar con CoinGecko</Typography>;

    return (
        <TableContainer component={Paper} elevation={3} className="rounded-xl overflow-hidden">
            <Table sx={{ minWidth: 650 }}>
                <TableHead className="bg-gray-50">
                    <TableRow>
                        <TableCell><span className="font-bold">Moneda</span></TableCell>
                        <TableCell align="right"><span className="font-bold">Precio</span></TableCell>
                        <TableCell align="right"><span className="font-bold">Cambio 24h</span></TableCell>
                        <TableCell align="right"><span className="font-bold">Market Cap</span></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {coins.length > 0 ? (
                        coins.map((coin) => (
                            <TableRow
                                key={coin.id}
                                hover
                                onClick={() => onCoinSelect(coin.id)}
                                selected={selectedCoin === coin.id}
                                className="cursor-pointer transition-colors"
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar src={coin.image} alt={coin.name} sx={{ width: 30, height: 30 }} />
                                        <Box>
                                            <Typography variant="body1" className="font-semibold">{coin.name}</Typography>
                                            <Typography variant="caption" className="uppercase text-gray-400">{coin.symbol}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>

                                <TableCell align="right">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(coin.current_price)}
                                </TableCell>

                                <TableCell align="right">
                                    <span className={coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}>
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                    </span>
                                </TableCell>

                                <TableCell align="right">
                                    {new Intl.NumberFormat('en-US', { notation: 'compact', currency }).format(coin.market_cap)}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center" className="py-10 text-gray-400 italic">
                                No se encontraron monedas
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CryptoTable;