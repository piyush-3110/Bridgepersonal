
import { Bridge } from "../components/Bridge";
import { Box } from "@mui/system";
import { Navbar } from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "../lib/store";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative", // Ensure relative positioning for absolute background
        backgroundImage: `url('./images/bgImage.jpg')`, // Specify the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      
      }}
    >
      <Navbar />
      <Bridge />
    </Box>
  );
}
