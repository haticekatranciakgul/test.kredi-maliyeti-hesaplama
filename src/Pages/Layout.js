import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";
import { ThemeProvider, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Divider from "@mui/material/Divider";
import ScrollToTop from "react-scroll-to-top";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';


const Layout = ({ children }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          width: '100%',
          minHeight: '100vh',
          paddingTop: {
            xs: '32%',
            sm: '22%',
            md: '15%',
            lg: '12%',
          },
          backgroundImage: theme => theme.palette.mode === 'dark'
            ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 30%), transparent)'
            : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 60%), transparent)',
        }}>
          <Container  maxWidth="xl" >
            <Navbar />
            {children}
          </Container>
          <ScrollToTop smooth />
          <Divider sx={{ paddingBottom: "20%"}}></Divider>
          <Footer />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
