import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./Pages/Layout";


const App = () => {
    const [theme, colorMode] = useMode();
    return <div>
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home></Home>}></Route>
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>

    </div>;
};

export default App;