"use client";
import { setBal } from "@/lib/features/balSlice";
import { useWebThreeFuncs } from "@/utils/contractFunctions";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionExecutionError, formatEther } from "viem";
import { useAccount } from "wagmi";

export const ThirdSection = () => {
  const estGasFee = useSelector((state) => state.estGasFee.value);
  const bal = useSelector((state) => state.bal.value);
  const tokens = useSelector((state) => state.input.value);
  const dispatch = useDispatch();
  const { address: walletAdd } = useAccount();

  const [transferBtnClicked, setTransferBtnClicked] = useState(false);

  const { bridge, balance } = useWebThreeFuncs();
  async function handleTransfer() {
    setTransferBtnClicked(true);
    if (walletAdd && bal > 0 && tokens > 0) {
      try {
        const data = await bridge(tokens);
        console.log(data);
        if (data.status === "success") {
          const newBal = await balance();
          console.log(formatEther(newBal.toString()));
          dispatch(setBal(formatEther(newBal.toString())));
        }
        setTransferBtnClicked(false);
        return;
      } catch (error) {
        if (
          error.name === "notSufficientGas" ||
          error.name === "notEnoughFloyxTokens"
        ) {
          // Handle the not enough tokens for the gas and value for the transaction to process error
          console.log(error.errorMessage);
        } else if (error instanceof TransactionExecutionError) {
          console.log("you rejected the transaction");
        }
        // console.log(error);
        setTransferBtnClicked(false);
      }
    }
  }
  useEffect(() => {
    setTransferBtnClicked(false);
  }, [walletAdd]);
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
        <Typography variant="subtitle2">{estGasFee * 1.5}</Typography>
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
        disabled={
          (!walletAdd && transferBtnClicked) || (bal <= 0 && transferBtnClicked)
        }
        onClick={handleTransfer}
      >
        Transfer Tokens
      </Button>
      {!walletAdd && transferBtnClicked ? (
        <Typography variant="subtitle2" sx={{ color: "red" }}>
          Please connect your wallet
        </Typography>
      ) : bal <= 0 && transferBtnClicked ? (
        <Typography variant="subtitle2" sx={{ color: "red" }}>
          You don't have enough tokens
        </Typography>
      ) : tokens <= 0 && transferBtnClicked ? (
        <Typography variant="subtitle2" sx={{ color: "red" }}>
          You must transfer more than 0 tokens
        </Typography>
      ) : null}
    </Box>
  );
};
