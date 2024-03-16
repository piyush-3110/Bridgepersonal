"use client"

import React from 'react'
import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
export const SecondSection = () => {
    const[val, setVal] = useState('0.00');
  return (
    <Box sx={{ display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
color:'white', backgroundColor:'#211e33',width:'85%',padding:2}}>
        <Box >
         <Typography variant='subtitle1'>{val}</Typography>   
         <Typography variant='subtitle2'>{val} Floyx</Typography>   

        </Box>
        <Box sx={{display:'flex',gap:4,alignItems: "center",}}>
        <Button variant='outlined'>Max</Button>
        <Typography variant='subtitle2'>FLOYX</Typography>
        </Box>
    </Box>
  )
}
