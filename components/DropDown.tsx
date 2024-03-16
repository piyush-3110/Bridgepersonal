import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function DropDown() {
  const [coin, setCoin] = React.useState('Polygon');
  
  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: '40%' }}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">{coin}</InputLabel>
        <Select
        sx={{backgroundColor:'gray'}}
     
          value={coin}
          label="Polygon"
          onChange={handleChange}
        >
          <MenuItem value="Polygon" onClick={()=>setCoin("Polygon")}>Polygon</MenuItem>
          <MenuItem value="Arbitrum" onClick={()=>setCoin("Arbitrum")}>Arbitrum</MenuItem>
          <MenuItem value="Base" onClick={()=>setCoin("Base")}>Base</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
