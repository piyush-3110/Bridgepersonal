"use client"
import { Box, Button, Typography, IconButton, Popover, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export const Navbar = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const open = Boolean(menuAnchor);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0b081f', padding: 3, height: '12vh' }}>
      <Box>
        <Typography variant='h5'>Floyx</Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, alignItems: 'center' }}>
        <Typography variant='subtitle2' sx={{ color: isHovering ? 'rgba(255, 255, 255, 0.7)' : 'inherit' }}>Floyx Contract Address |</Typography>
        <Button
          variant='text'
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Add To Metamask
        </Button>
      </Box>
      <Box>
        <Button sx={{ width: "100%", backgroundColor: "#937cff", color: "black", '&:hover': { backgroundColor: '#7a5ce1' }, padding: [1] }}>Connect Wallet</Button>
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}>
        <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
        <Popover
          anchorEl={menuAnchor}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1, backgroundColor:'black' }}>
            <Box sx={{ width: 'auto', marginLeft: 'auto' }}>
              <IconButton onClick={handleMenuClose} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <List sx={{ backgroundColor: 'black', padding: 0 }}>
            <ListItem onClick={handleMenuClose} sx={{'&:hover': { cursor: 'pointer' }}}>
              <ListItemText primary="Add To Metamask" />
            </ListItem>
          </List>
        </Popover>
      </Box>
    </Box>
  );
};
