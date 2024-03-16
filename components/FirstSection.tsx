"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IconButton, colors } from "@mui/material";
interface Coins {
  value: string;
  label: string;
  chainId: number;
}
export const FirstSection = () => {
  const [coin, setCoin] = React.useState<string>("Polygon");
  const [coin1, setCoin1] = React.useState<string>("Arbitrum");
  const [chainId, setchainId] = React.useState<number | undefined>();
  const coins: Coins[] = [
    { value: "Polygon", label: "Polygon", chainId: 12322 },
    { value: "Arbitrum", label: "Arbitrum", chainId: 11222 },
    { value: "Base", label: "Base", chainId: 122322 },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    if (newValue !== coin1) {
      setCoin(newValue);
    }
  };

  const handleChangeCoin1 = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    if (newValue !== coin) {
      setCoin1(newValue);
    }
  };

  const handleChain = (chainId: number) => {
    setchainId(chainId);
    console.log(chainId);
  };

  const handleClick = () => {
    const temp = coin;
    setCoin(coin1);
    setCoin1(temp);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "85%",
      }}
    >
      <Box sx={{ minWidth: { xs: "41%", sm: "43%" } }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ color: "gray" }}>
            {coin}
          </InputLabel>
          <Select
            sx={{ backgroundColor: ["#211e33"], color: "white" }}
            value={coin}
            label="Polygon"
            onChange={handleChange}
            MenuProps={{
              // Overriding the default MenuItem styles
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
                onClick={() => handleChain(coinItem.chainId)}
                disabled={coin1 === coinItem.value}
              >
                {coinItem.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <IconButton sx={{ color: "blue", marginX: "3%" }} onClick={handleClick}>
        <SwapHorizIcon />
      </IconButton>
      <Box sx={{ minWidth: { xs: "41%", sm: "43%" } }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ color: "gray" }}>
            {coin1}
          </InputLabel>
          <Select
            sx={{ backgroundColor: "#211e33", color: "white" }}
            variant="outlined"
            value={coin1}
            label="Arbitrum"
            onChange={handleChangeCoin1}
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
                onClick={() => handleChain(coinItem.chainId)}
                disabled={coin === coinItem.value}
              >
                {coinItem.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
