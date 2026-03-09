import { Box, Typography, Chip, Stack } from '@mui/material';
import { DollarSign, Euro, CircleDollarSign } from 'lucide-react';

interface Props {
    value: string;
    onChange: (val: string) => void;
}

const CurrencySelector = ({ value, onChange }: Props) => {
    const currencies = [
        { id: 'usd', label: 'USD', icon: <DollarSign size={14} /> },
        { id: 'eur', label: 'EUR', icon: <Euro size={14} /> },
        { id: 'mxn', label: 'MXN', icon: <CircleDollarSign size={14} /> },
    ];

    return (
        <Box>
            <Typography variant="caption" className="font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">
                Visualizar en
            </Typography>
            <Stack direction="row" spacing={1}>
                {currencies.map((curr) => (
                    <Chip
                        key={curr.id}
                        icon={curr.icon}
                        label={curr.label}
                        onClick={() => onChange(curr.id)}
                        variant={value === curr.id ? "filled" : "outlined"}
                        color={value === curr.id ? "primary" : "default"}
                        sx={{
                            borderRadius: '8px',
                            fontWeight: value === curr.id ? 'bold' : 'normal',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: value === curr.id ? '' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                        className={value === curr.id ? "shadow-md" : "text-slate-500"}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default CurrencySelector;