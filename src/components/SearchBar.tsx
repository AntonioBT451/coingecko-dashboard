import { TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar moneda (ej. Bitcoin, ETH...)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-white rounded-lg"
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search size="1.2em" className="text-gray-400" />
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                height: '100%',
                '& .MuiOutlinedInput-root': {
                    height: '100%',
                    '& fieldset': {
                        borderRadius: '12px',
                    },
                },
                '& .MuiInputBase-input': {
                    height: '100%',
                    padding: '0 14px',
                    fontSize: '1.0em',
                },
                '& .MuiInputAdornment-root': {
                    height: '100%',
                    maxHeight: 'none',
                    marginRight: '2px',
                    '& .MuiTypography-root': {
                        fontSize: '1em',
                    },
                },
            }}
        />
    );
};

export default SearchBar;