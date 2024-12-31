import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";
import { ThemeProvider, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MainContent from "../Components/MainContent";

const Layout = ( {children}) => {
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
          <MainContent></MainContent>
          <Divider></Divider>
          
       
        <Footer />
       
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
