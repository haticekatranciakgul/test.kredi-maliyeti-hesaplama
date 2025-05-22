import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, CircularProgress, Box } from "@mui/material";
import Layout from "./Pages/Layout";

// Lazy loading ile sayfaları import et
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Calculate = lazy(() => import("./Pages/Calculate"));
const Contact = lazy(() => import("./Pages/Contact"));
const Sss = lazy(() => import("./Pages/Sss"));

// Loading component
const LoadingFallback = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

const App = () => {
    const [theme, colorMode] = useMode();

   /*  useEffect(() => {
        // Performans ölçümü
        const measurePerformance = () => {
            // Sayfa yüklenme süresi
            const loadTime = performance.now();
           //console.log(`Sayfa yüklenme süresi: ${loadTime}ms`);

            // Bundle boyutu
            const resources = performance.getEntriesByType('resource');
            const jsResources = resources.filter(r => r.name.endsWith('.js'));
            const totalJsSize = jsResources.reduce((acc, curr) => acc + curr.transferSize, 0);
            //console.log(`Toplam JS Bundle Boyutu: ${(totalJsSize / 1024 / 1024).toFixed(2)}MB`);

            // Memory kullanımı
            if (performance.memory) {
                //console.log(`Kullanılan Heap: ${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
            }
        };

        // Sayfa yüklendiğinde performans ölçümü yap
        window.addEventListener('load', measurePerformance);

        return () => {
            window.removeEventListener('load', measurePerformance);
        };
    }, []); */

    return <div>
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <BrowserRouter>
                    <Layout>
                        <Suspense fallback={<LoadingFallback />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/hesapla" element={<Calculate />} />
                                <Route path="/hakkinda" element={<About />} />
                                <Route path="/sss" element={<Sss />} />
                                <Route path="/iletisim" element={<Contact />} />
                            </Routes>
                        </Suspense>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    </div>;
};

export default App;