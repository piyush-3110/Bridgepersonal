"use client";
import { Box, Button, Typography } from "@mui/material";
import { formatEther } from "viem";

export const SecondSection = ({ val, setVal, bal }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    // Regular expression to match only numbers and decimal points
    const regex = /^\d*\.?\d*$/;
    if (regex.test(newValue)) {
      setVal(newValue);
    }
  };

  async function handleMaxBtn() {
    setVal(formatEther(bal.toString()));
  }

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
        <Button variant="outlined" onClick={handleMaxBtn}>
          Max
        </Button>
        <Typography variant="subtitle2">FLOYX</Typography>
      </Box>
    </Box>
  );
};
