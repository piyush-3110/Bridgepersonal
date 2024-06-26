import { useWebThreeFuncs } from "@/utils/contractFunctions";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { setValue } from "@/lib/features/inputSlice";
import { setEstGasFee } from "@/lib/features/EstGasFeeSlice";
import { setBal } from "@/lib/features/balSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
export const SecondSection = () => {
  const fromChain = useAppSelector((state) => state.chain.fromChain);
  const balVar = useAppSelector((state) => state.bal.value);
  const val = useAppSelector((state) => state.input.value);
  const dispatch = useAppDispatch();

  const [maxBtnClicked, setMaxBtnClicked] = useState<boolean>(false);
  const { balance, getEstimatedFee } = useWebThreeFuncs();
  const { address: walletAdd } = useAccount();

  // const [val, setVal] = useState("");

  useEffect(() => {
    if (walletAdd) {
      (async () => {
        const _bal = await balance();
        dispatch(setBal(formatEther(_bal)));
        dispatch(setValue(""));
        // setVal("");
      })();
    }
  }, [fromChain.name, walletAdd]);

  async function estfee(inputVal: string) {
    const data = (await getEstimatedFee(parseEther(inputVal))) as [bigint, any];
    dispatch(setEstGasFee(formatEther(data[0])));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const regex = /^\d*\.?\d*$/;
    if (regex.test(newValue)) {
      dispatch(setValue(newValue));
      if (walletAdd) {
        const fee = setTimeout(() => {
          estfee(newValue);
        }, 2000);

        return () => clearTimeout(fee);
      }
    }
  };

  async function handleMaxBtn() {
    if (!walletAdd) {
      setMaxBtnClicked(true);
    } else {
      dispatch(setValue(balVar.toString()));
      estfee(balVar.toString());
      setMaxBtnClicked(false);
    }
  }

  useEffect(() => {
    setMaxBtnClicked(false);
  }, [walletAdd]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "center",

        color: "white",
        width: "85%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
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
          <Typography variant="subtitle2">{balVar} Floyx</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: { xs: "8px", sm: 4 },
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleMaxBtn}
            disabled={!walletAdd && maxBtnClicked}
            sx={{
              "&:disabled": {
                border: "1px red solid",
                color: "red",
                cursor: "not-allowed",
              },
            }}
          >
            Max
          </Button>
          <a href="/">
            <img
              src="./images/Logo.png"
              alt="FLOYX"
              style={{ height: "auto", width: 60 }}
            ></img>
          </a>
        </Box>
      </Box>
      {!walletAdd && maxBtnClicked && (
        <Typography variant="subtitle2" sx={{ color: "red" }}>
          Please connect your wallet
        </Typography>
      )}
    </Box>
  );
};
