import React, { useContext} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";
import { ThemeProvider, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Calculate from "./Calculate";

const Home = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
            width: '100%',
            backgroundImage: theme => theme.palette.mode === 'dark'
                ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 30%), transparent)'
                : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 60%), transparent)',
        }}>
          <Calculate></Calculate>

      
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
};

export default Home;
