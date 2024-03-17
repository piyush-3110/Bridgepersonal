"use client";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ConnectButton from "./ConnectWalletButton";

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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0b081f",
        padding: 3,
        height: "10vh",
      }}
    >
      <Box>
        <Typography variant="h5">Floyx</Typography>
      </Box>
      <Box>
        <Button variant="text">Floyx Contract Address</Button>
        <Button variant="text">Add To Metamask</Button>
      </Box>
      <Box>
        <ConnectButton />
      </Box>
    </Box>
  );
};
