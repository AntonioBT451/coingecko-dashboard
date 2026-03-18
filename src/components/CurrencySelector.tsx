import { Box, Chip, Stack } from '@mui/material';

interface Props {
    value: string;
    onChange: (val: string) => void;
}

const CurrencySelector = ({ value, onChange }: Props) => {
    const currencies = [
        { id: 'usd', label: 'USD' },
        { id: 'eur', label: 'EUR' },
        { id: 'mxn', label: 'MXN' },
    ];

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();

            let nextIndex;
            if (e.key === 'ArrowRight') {
                nextIndex = (index + 1) % currencies.length;
            } else {
                nextIndex = (index - 1 + currencies.length) % currencies.length;
            }

            const nextElement = document.getElementById(`chip-${currencies[nextIndex].id}`);
            nextElement?.focus();
        }
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
        }}>
            <Stack
                direction="row"
                spacing={1}
                role="radiogroup"
                aria-label="Seleccionar divisa"
                sx={{
                    height: '100%',
                    alignItems: 'center',
                }}
            >
                {currencies.map((curr, index) => (
                    <Chip
                        id={`chip-${curr.id}`}
                        key={curr.id}
                        label={curr.label}
                        onClick={() => onChange(curr.id)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        variant={value === curr.id ? "filled" : "outlined"}
                        color={value === curr.id ? "primary" : "default"}
                        sx={{
                            borderRadius: '8px',
                            fontWeight: value === curr.id ? 'bold' : 'normal',
                            transition: 'all 0.2s ease',
                            height: '80%',
                            maxHeight: '48px',
                            minHeight: '24px',
                            '& .MuiChip-label': {
                                fontSize: '1.1em',
                                px: 1.5,
                            },
                            '&:hover': {
                                backgroundColor: value === curr.id ? '' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                        tabIndex={value === curr.id ? 0 : -1}
                        role="radio"
                        aria-checked={value === curr.id}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default CurrencySelector;