import React, { useContext} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";
import { ThemeProvider, useTheme } from "@mui/material";
import Calculate from "./Calculate";

const Home = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Calculate></Calculate>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
};

export default Home;
