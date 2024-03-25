"use client";
import { Box } from "@mui/system";
import { FirstSection } from "./FirstSection";
import { SecondSection } from "./SecondSection";
import { ThirdSection } from "./ThirdSection";
export const Bridge = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
        position: "relative",
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
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </Box>
    </Box>
  );
};
