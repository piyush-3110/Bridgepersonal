"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IconButton } from '@mui/material';
import arbitrum from '../public/images/Arbitrum.png';
import base from '../public/images/base.png';
import ethereum from '../public/images/ethereum.png';
import scroll from '../public/images/scroll.png';
import polygon from '../public/images/polygon.png';
import optimism from '../public/images/optimism.png';


export const FirstSection = () => {
  const [coin, setCoin] = React.useState('Polygon');
  const [coin1, setCoin1] = React.useState('Arbitrum');
  const [chainId, setChainId] = React.useState<number | undefined>();
  const [prev,setPrev] = React.useState('');
  const [prev1,setPrev1] = React.useState('');

  const coins = [
    { value: "Polygon", label: "Polygon", chainid: 12322, logo:'./images/polygon.png' },
    { value: "Arbitrum", label: "Arbitrum", chainid: 11222, logo:'./images/arbitrum.png' },
    { value: "Base", label: "Base", chainid: 122322, logo:'./images/base.png' },
    { value: "Scroll", label: "Scroll", chainid: 122322,logo:'./images/scroll.png' },
    { value: "Optimism", label: "Optimism", chainid: 122322, logo:'./images/optimism.png' },
    { value: "Ethereum", label: "Ethereum", chainid: 122322, logo:'./images/ethereum.jpg' },
  ];

  React.useEffect(()=>{
    if(coin!== 'Polygon'&& coin1!== 'Polygon'){
        setCoin1('Polygon');
    }
    else if(coin=== 'Polygon'&& coin1==='Polygon'){
     setCoin1(prev);
    }
  },[coin])
  
  React.useEffect(()=>{
    if(coin1!== 'Polygon'&& coin!== 'Polygon'){
        setCoin('Polygon');
    }
    else if(coin1=== 'Polygon'&& coin==='Polygon'){
        setCoin(prev);
    }
  },[coin1])
  
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    if (newValue !== coin1) {
      setCoin(newValue);
    }
  };

  const handleChangeCoin1 = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    if (newValue !== coin) {
      setCoin1(newValue);
    }
  };

  const handleChain = (chainId: number,label:string) => {
    setChainId(chainId);
    setPrev(label);
  };

  const handleChain1 = (chainId: number, label:string) => {
    setChainId(chainId);
    setPrev1(label);
  };

  const handleClick = () => {
    const temp = coin;
    setCoin(coin1);
    setCoin1(temp);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: '85%'
      }}
    >
      <Box sx={{ minWidth: { xs: '41%', sm: '43%' } }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ color: 'gray' }}>{coin}</InputLabel>
          <Select
            sx={{ backgroundColor: ["#211e33"], color: 'white' }}
            value={coin}
            label="Polygon"
            onChange={handleChange}
            MenuProps={{ // Overriding the default MenuItem styles
              PaperProps: {
                sx: {
                  backgroundColor: '#0b081f',
                  border: '1px solid gray',
                },
              },
            }}
          >
            {coins.map((coinItem) => (
              <MenuItem key={coinItem.value} value={coinItem.value} onClick={() => handleChain(coinItem.chainid, coinItem.label )} disabled={coin1 === coinItem.value}>
                {coinItem.logo ? 
                  <>
                    <img src={coinItem.logo} alt={coinItem.value} style={{  height: '30px', marginRight: '10px', verticalAlign: 'middle' }} /> 
                    {coinItem.label}
                  </>
                : 
                  null
                }
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <IconButton sx={{ color: 'blue', marginX: "3%" }} onClick={handleClick}><SwapHorizIcon /></IconButton>
      <Box sx={{ minWidth: { xs: '41%', sm: '43%' } }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ color: 'gray' }}>{coin1}</InputLabel>
          <Select
            sx={{ backgroundColor: "#211e33", color: 'white' }}
            variant="outlined"
            value={coin1}
            label="Arbitrum"
            onChange={handleChangeCoin1}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#0b081f',
                  border: '1px solid gray'
                },
              },
            }}
          >
            {coins.map((coinItem) => (
              <MenuItem key={coinItem.value} value={coinItem.value} onClick={() => handleChain1(coinItem.chainid, coinItem.label)} disabled={coin === coinItem.value}>
                {coinItem.logo ? 
                  <>
                    <img src={coinItem.logo} alt={coinItem.value} style={{ height: '30px', marginRight: '10px', verticalAlign: 'middle' }} /> 
                    {coinItem.label}
                  </>
                : 
                  null
                }
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
