import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";
import { ThemeProvider, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Box from "@mui/material/Box";

const Layout = ( {children}) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            width: '100%',
            backgroundImage: theme => theme.palette.mode === 'dark'
              ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 30%), transparent)'
              : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 60%), transparent)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', 
          }}
        >
          <Navbar />
          {children}
          <Footer />
        </Box>
       
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
