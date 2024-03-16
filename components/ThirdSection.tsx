"use client";
import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";

export const ThirdSection = () => {
  const [fee, setFee] = useState("0.00");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",

        color: "white",
        width: "85%",
      }}
    >
      <Box>
        <Typography variant="subtitle2">Destination Address</Typography>
        <TextField
          variant="outlined"
          placeholder="0x346...."
          sx={{
            backgroundColor: "#211e33",
            color: "white",
            "& input::placeholder": {
              color: "gray", // Change placeholder color here
            },
            width: "100%",
          }}
        ></TextField>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="subtitle2">Est. Fee</Typography>
        <Typography variant="subtitle2">{fee}</Typography>
      </Box>
      <Button
        sx={{
          width: "100%",
          backgroundColor: "#937cff",
          color: "black",
          "&:hover": {
            backgroundColor: "#7a5ce1",
          },
          padding: [1.5],
        }}
      >
        Connect Wallet
      </Button>
    </Box>
  );
};
