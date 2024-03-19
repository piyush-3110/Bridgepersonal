"use Client";
import { Box } from "@mui/system";
import { FirstSection } from "./FirstSection";
import { SecondSection } from "./SecondSection";
import { ThirdSection } from "./ThirdSection";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWebThreeFuncs } from "@/utils/contractFunctions";
import { useAccount } from "wagmi";

export const Bridge = () => {
  const [val, setVal] = useState("");
  const { balance, bridge } = useWebThreeFuncs();
  const [fromChain, setFromChain] = useState({
    name: "Polygon",
    chainId: 10109,
  });
  const [toChain, setToChain] = useState({
    name: "Arbitrum",
    chainId: 10231,
  });
  const [bal, setBal] = useState(0);

  const { address: walletAdd } = useAccount();

  // const { data: bal, isFetching: balFetching } = useQuery({
  //   queryKey: ["userBal"],
  //   queryFn: balance,
  // });

  useEffect(() => {
    if (walletAdd) {
      (async () => {
        const _bal = await balance(fromChain);
        setBal(_bal);
      })();
    }
  }, [walletAdd, fromChain]);

  // const { data: gasFee, isFetching: gasFetching } = useQuery({
  //   queryKey: ["estimatedSendFee"],
  //   queryFn: async () => {
  //     const res = await bridge(val);
  //     return res;
  //   },
  // });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >
      <Box
        sx={{
          minHeight: {
            xs: "70vh",
            sm: "60vh",
            md: "80vh",
            lg: "80vh",
          },
          borderRadius: "15px",
          bgcolor: "#0b081f",
          width: {
            xs: "90vw",
            sm: "70vw",
            md: "50vw",
            lg: "40vw",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          paddingY: "8px",
        }}
      >
        <FirstSection
          fromChain={fromChain}
          setFromChain={setFromChain}
          toChain={toChain}
          setToChain={setToChain}
        />
        <SecondSection val={val} setVal={setVal} bal={bal} />
        <ThirdSection
          val={val}
          bal={bal}
          // balFetching={balFetching}
          gasFee={0}
        />
      </Box>
    </Box>
  );
};
