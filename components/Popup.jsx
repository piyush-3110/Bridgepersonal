"use client";
import React, { useState } from "react";
import { Box, IconButton, Typography, Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import Close from "@mui/icons-material/Close";
export const Popup = ({ onClose }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setSnackbarMessage("Copied to clipboard");
    setOpenSnackbar(true);
  };
  const handleCloseModal = () => {
    // Function to close the modal
    // Implement your closing logic here
    onClose();
  };

  const contract = [
    {
      name: "Polygon",
      address: process.env.NEXT_PUBLIC_TOKEN_POLYGON_ADDRESS,
      logo: "./images/polygon.png",
      value: 1,
    },
    {
      name: "Arbitrum",
      address: process.env.NEXT_PUBLIC_TOKEN_ARBITRUM_ADDRESS,
      logo: "./images/Arbitrum.png",
      value: 2,
    },
    {
      name: "Base",
      address: process.env.NEXT_PUBLIC_TOKEN_BASE_ADDRESS,
      logo: "./images/base.png",
      value: 3,
    },
    {
      name: "Binance",
      address: process.env.NEXT_PUBLIC_TOKEN_BSC_ADDRESS,
      logo: "./images/scroll.png",
      value: 4,
    },
    {
      name: "Ethereum",
      address: process.env.NEXT_PUBLIC_TOKEN_SEPOLIA_ADDRESS,
      logo: "./images/ethereum.png",
      value: 5,
    },
    {
      name: "Optimism",
      address: process.env.NEXT_PUBLIC_TOKEN_OPTIMISM_ADDRESS,
      logo: "./images/optimism.png",
      value: 6,
    },
  ];

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: {
            xs: "80vh",
            sm: "55vh",
            md: "80vh",
            lg: "85vh",
          },
          transform: "translate(-50%, -50%)",
          width: {
            xs: "100%",
            sm: "70vw",
            md: "48vw",
            lg: "42vw",
          },
          backgroundColor: "#0b081f",
          boxShadow: 24,
          overflow: "scroll",
          overflowX: "hidden",
          p: 4,
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#888",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#fff",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#fffa",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "1rem",
                }}
              >
                Add to Metamask
              </Typography>

              <img
                src="./images/metamask.png"
                alt="Metamaskicon"
                style={{ height: 20 }}
              />
            </Box>

            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                color: "#545263",
                textAlign: "center",
              }}
            >
              Add floyx to your metamask wallet by choosing the appropriate
              contract address
            </Typography>
            <hr
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            />
          </Box>

          {contract.map((contractItem) => (
            <Box
              key={contractItem.value}
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
              }}
            >
              <img src={contractItem.logo} alt="Logo" style={{ height: 20 }} />
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    width: "100%",
                    paddingBottom: "4px",
                    fontSize: "1rem",
                  }}
                >
                  {contractItem.name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "1px",
                  }}
                >
                  <Typography sx={{ fontWeight: "semibold" }}>
                    Floyx Contract Address
                  </Typography>
                  <IconButton
                    onClick={() => handleCopyAddress(contractItem.address)}
                    sx={{
                      color: "#35599f",
                      paddingRight: "8px",
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
                <Typography sx={{ color: "#545263" }}>
                  {contractItem.address}
                </Typography>

                {contractItem.value == 6 ? (
                  ""
                ) : (
                  <hr
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} // Adjust the duration as needed
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        style={{ position: "fixed" }}
      />
    </>
  );
};
