"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Select from "@mui/material/Select";
import { IconButton } from "@mui/material";
import { setFromChain, setToChain } from "@/lib/features/chainSlice";
import { setValue } from "@/lib/features/inputSlice";
import { setEstGasFee } from "@/lib/features/EstGasFeeSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

export const FirstSection = () => {
  const fromChain = useAppSelector((state) => state.chain.fromChain);
  const toChain = useAppSelector((state) => state.chain.toChain);
  const dispatch = useAppDispatch();

  interface Chain {
    value: string;
    label: string;
    chainId: number;
    logo: string;
  }

  const coins: Chain[] = [
    {
      value: "Polygon",
      label: "Polygon",
      chainId: 10109,
      logo: "./images/polygon.png",
    },
    {
      value: "Arbitrum",
      label: "Arbitrum",
      chainId: 10231,
      logo: "./images/arbitrum.png",
    },
    {
      value: "Base",
      label: "Base",
      chainId: 10245,
      logo: "./images/base.png",
    },
    {
      value: "Binance",
      label: "Binance",
      chainId: 10102,
      logo: "./images/scroll.png",
    },
    {
      value: "Optimism",
      label: "Optimism",
      chainId: 10232,
      logo: "./images/optimism.png",
    },
    {
      value: "Ethereum",
      label: "Ethereum",
      chainId: 10161,
      logo: "./images/ethereum.jpg",
    },
  ];

  function switchChains() {
    const tempChain = { ...fromChain };
    dispatch(setFromChain({ ...toChain }));
    dispatch(setToChain({ ...tempChain }));
    dispatch(setEstGasFee("0"));
  }

  function handleChange(event: any, id: string) {
    const selectedChain = event.target.value;
    const selectedChainObject = coins.find(
      (coin) => coin.value === selectedChain
    ) as Chain;

    if (id === "from-select") {
      dispatch(
        setFromChain({
          name: selectedChainObject.value,
          chainId: selectedChainObject.chainId,
        })
      );

      if (selectedChain !== "Polygon") {
        const polygonChain = coins.find(
          (coin) => coin.value === "Polygon"
        ) as Chain;
        dispatch(
          setToChain({
            name: polygonChain.value,
            chainId: polygonChain.chainId,
          })
        );
      }
    } else if (id === "to-select") {
      dispatch(
        setToChain({
          name: selectedChainObject.value,
          chainId: selectedChainObject.chainId,
        })
      );

      if (selectedChain !== "Polygon") {
        const polygonChain = coins.find(
          (coin) => coin.value === "Polygon"
        ) as Chain;
        dispatch(
          setFromChain({
            name: polygonChain.value,
            chainId: polygonChain.chainId,
          })
        );
      }
    }
    dispatch(setValue("0"));
    dispatch(setEstGasFee("0"));
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "85%",
        paddingTop: "12px",
      }}
    >
      <Box sx={{ minWidth: { xs: "41%", sm: "43%" } }}>
        <FormControl fullWidth>
          <InputLabel
            id="from-chain-label"
            sx={{ color: "gray", textAlign: "center" }}
          >
            From
          </InputLabel>
          <Select
            sx={{ backgroundColor: ["#211e33"], color: "white" }}
            value={fromChain && fromChain.name}
            label="From"
            onChange={(e) => handleChange(e, "from-select")}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#0b081f",
                  border: "1px solid gray",
                },
              },
            }}
          >
            {coins.map((coinItem) => (
              <MenuItem
                key={coinItem.value}
                value={coinItem.value}
                disabled={
                  (toChain && toChain.name === coinItem.value) ||
                  (fromChain && fromChain.name === coinItem.value)
                }
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img src={coinItem.logo} alt="Logo" style={{ height: 20 }} />
                  {coinItem.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <IconButton sx={{ color: "blue", marginX: "3%" }} onClick={switchChains}>
        <SwapHorizIcon />
      </IconButton>
      <Box sx={{ minWidth: { xs: "41%", sm: "43%" } }}>
        <FormControl fullWidth>
          <InputLabel
            id="to-chain-label"
            sx={{ color: "gray", textAlign: "center" }}
          >
            To
          </InputLabel>
          <Select
            sx={{ backgroundColor: "#211e33", color: "white" }}
            variant="outlined"
            value={toChain && toChain.name}
            label="To"
            onChange={(e) => handleChange(e, "to-select")}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#0b081f",
                  border: "1px solid gray",
                },
              },
            }}
          >
            {coins.map((coinItem) => (
              <MenuItem
                key={coinItem.value}
                value={coinItem.value}
                disabled={
                  (fromChain && fromChain.name === coinItem.value) ||
                  (toChain && toChain.name === coinItem.value)
                }
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img src={coinItem.logo} alt="Logo" style={{ height: 20 }} />
                  {coinItem.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
