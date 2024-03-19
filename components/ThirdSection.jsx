"use client";
import { useWebThreeFuncs } from "@/utils/contractFunctions";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";

export const ThirdSection = ({ val, bal, gasFee }) => {
  const { bridge } = useWebThreeFuncs();
  console.log(+val);
  console.log(bal);
  async function handleTransfer() {
    const demn = await bridge(val);
    console.log(val);
  }

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
        <Typography variant="subtitle2">
          Destination Address (Optional)
        </Typography>
        <TextField
          variant="outlined"
          placeholder="0x346...."
          sx={{
            backgroundColor: "#211e33",
            color: "white",
            "& input::placeholder": {
              color: "gray",
            },
            width: "100%",
          }}
        ></TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="subtitle2">Est. Fee</Typography>
        <Typography variant="subtitle2">
          {gasFee ? formatEther(gasFee[0].toString()) * 1.5 : "0.0"}
        </Typography>
      </Box>
      <Button
        sx={{
          width: "100%",
          backgroundColor: "#937cff",
          color: "black",
          "&:hover": {
            backgroundColor: "#7a5ce1",
          },
          "&:disabled": {
            cursor: "not-allowed",
          },
          padding: [1.5],
        }}
        disabled={bal <= 0}
      >
        Transfer Tokens
      </Button>
      {bal <= 0 ? (
        <Typography variant="subtitle2" sx={{ color: "red" }}>
          You don't have enough tokens
        </Typography>
      ) : null}
    </Box>
  );
};
