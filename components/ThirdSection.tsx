"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setBal } from "@/lib/features/balSlice";
import { setDestAddress } from "@/lib/features/destAddressSlice";
import { setValue } from "@/lib/features/inputSlice";
import { useWebThreeFuncs } from "@/utils/contractFunctions";
import { Box, TextField, Typography, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { TransactionExecutionError, formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

export const ThirdSection = () => {
  const estGasFee = useAppSelector((state) => state.estGasFee.value);
  const bal = useAppSelector((state) => state.bal.value);
  const tokens = useAppSelector((state) => state.input.value);

  const dispatch = useAppDispatch();
  const { address: walletAdd } = useAccount();
  const { bridge, balance } = useWebThreeFuncs();
  const [transferBtnClicked, setTransferBtnClicked] = useState(false);
  const [destAdd, setDestAdd] = useState("");
  const [destAddError, setDestAddError] = useState(false);
  const [transactionProccessing, setTransactionProccessing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  async function handleTransfer() {
    setTransactionProccessing(true);
    setTransferBtnClicked(true);
    if (walletAdd && bal > 0 && tokens > 0) {
      try {
        const data = await bridge(parseEther(tokens.toString()));
        if (data.status === "success") {
          const newBal = await balance();
          dispatch(setBal(formatEther(newBal)));
          dispatch(setValue(""));
          setOpenSnackbar(true);
        }
        setTransferBtnClicked(false);
        setTransactionProccessing(false);
        setDestAddError(false);
        return;
      } catch (error: any) {
        if (
          error.name === "notSufficientGas" ||
          error.name === "notEnoughFloyxTokens"
        ) {
          // Handle the not enough tokens for the gas and value for the transaction to process error
          console.log(error.errorMessage);
        }
        if (error instanceof TransactionExecutionError) {
          console.log("you rejected the transaction");
        }
        if (
          error.shortMessage.includes(
            "Invalid parameters were provided to the RPC method."
          )
        ) {
          setDestAddError(true);
        }
        setTransferBtnClicked(false);
      }
    }
    setTransactionProccessing(false);
  }

  useEffect(() => {
    if (destAdd !== "") {
      dispatch(setDestAddress(destAdd));
    }
  }, [destAdd]);

  useEffect(() => {
    setTransferBtnClicked(false);
    dispatch(setDestAddress(null));
    setDestAdd("");
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
          value={destAdd}
          onChange={(e) => {
            setDestAdd(e.target.value);
          }}
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
        {destAddError && (
          <Typography variant="subtitle2" sx={{ color: "red", mt: "12px" }}>
            Please provide a valid address
          </Typography>
        )}
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
          (!walletAdd && transferBtnClicked) ||
          (bal <= 0 && transferBtnClicked) ||
          transactionProccessing
        }
        onClick={handleTransfer}
      >
        {transactionProccessing ? "Proccessing" : "Transfer Tokens"}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} // Adjust the duration as needed
        onClose={() => setOpenSnackbar(false)}
        message={"Tokens Transferred Successfully"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ position: "fixed", bgcolor: "green" }}
      />
    </Box>
  );
};
