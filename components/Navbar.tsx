"use client";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

export const Navbar = () => {
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
        <Button
          sx={{
            width: "100%",
            backgroundColor: "#937cff",
            color: "black",
            "&:hover": {
              backgroundColor: "#7a5ce1",
            },
            padding: [1],
          }}
        >
          Connect Wallet
        </Button>
      </Box>
    </Box>
  );
};
