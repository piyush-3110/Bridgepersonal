"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Bridge } from "../components/Bridge";
import { Box } from "@mui/system";
import { Navbar } from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "../lib/store";
export default function Home() {
  return (
    <Box
      className={styles.main}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
      }}
    >
      <Navbar />
      <Bridge />
    </Box>
  );
}
