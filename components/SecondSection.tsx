"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export const SecondSection: React.FC = () => {
  const [val, setVal] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;
    // Regular expression to match only numbers and decimal points
    const regex: RegExp = /^\d*\.?\d*$/;
    if (regex.test(newValue)) {
      setVal(newValue);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        width: "85%",
        padding: 2,
        backgroundColor: "#211e33",
        borderRadius: "4px",
      }}
    >
      <Box>
        <input
          value={val}
          placeholder="0.00"
          onChange={handleChange}
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            width: "7rem",
            color: "white",
            padding: "0",
          }}
        />
        <Typography variant="subtitle2">0.00 Floyx</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
        <Button variant="outlined">Max</Button>
        <Typography variant="subtitle2">FLOYX</Typography>
      </Box>
    </Box>
  );
};
