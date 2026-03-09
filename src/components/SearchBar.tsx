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
                            <Search size={20} className="text-gray-400" />
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderRadius: '12px' },
                },
            }}
        />
    );
};

export default SearchBar;