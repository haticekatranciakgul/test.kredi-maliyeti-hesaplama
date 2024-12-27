import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import { ColorModeContext, useMode } from "./theme";
import {  CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Pages/Navbar";
import Footer from "./Pages/Footer";


const App =() => {
    const [theme, colorMode] = useMode();
    return <div>
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                </Routes>
                <Footer></Footer>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>

    </div>;
};

export default App;