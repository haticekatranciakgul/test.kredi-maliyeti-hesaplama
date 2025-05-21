import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ColorModeContext, useMode } from "./constants/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Calculate from "./pages/Calculate";
import Contact from "./pages/Contact";
import Sss from "./pages/Sss";


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
                            <Route path="/hesapla" element={<Calculate></Calculate>}></Route>
                            <Route path="/hakkinda" element={<About></About>}></Route>
                            <Route path="/sss" element={<Sss></Sss>}></Route>
                            <Route path="/iletisim" element={<Contact></Contact>}></Route>
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>

    </div>;
};

export default App;