import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";
import { ThemeProvider, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Divider from "@mui/material/Divider";
import ScrollToTop from "react-scroll-to-top";


const Layout = ({ children }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Divider></Divider>
        <Navbar />
        {children}
        <Divider></Divider>
        <ScrollToTop smooth />
        <Footer />

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
