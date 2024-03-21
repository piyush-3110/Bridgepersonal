import { useWebThreeFuncs } from "@/utils/contractFunctions";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { setValue } from "@/lib/features/inputSlice";
export const SecondSection = ({ val, setVal }) => {
  const fromChain = useSelector((state) => state.chain.fromChain);
  const dispatch = useDispatch();
  const [balVar, setBalVar] = useState("0");
  const { balance } = useWebThreeFuncs();
  const { address: walletAdd } = useAccount();

  useEffect(() => {
    if (walletAdd) {
      (async () => {
        const _bal = await balance();
        setBalVar(formatEther(_bal.toString()));
        setVal("");
      })();
    }
  }, [fromChain.name]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    const regex = /^\d*\.?\d*$/;
    if (regex.test(newValue)) {
      setVal(newValue);
      dispatch(setValue(newValue));
    }
  };

  async function handleMaxBtn() {
    setVal(balVar);
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
        <Typography variant="subtitle2">{balVar} Floyx</Typography>
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
