import React, { Suspense } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IpMapping from "./components/pages/IpMapping";
import CustomPopup from "./components/pages/CustomPopup";
import DataAnalysis from "./components/pages/DataAnalysis";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomSpinner from "./components/common/Spinner";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: false,
            refetchOnWindowFocus: false,
        },
    },
});

export default function App() {
    const basename = process.env.NODE_ENV === "development" ? "" : process.env.PUBLIC_URL;

    return (
        <ChakraProvider theme={theme}>
            <Suspense fallback={<CustomSpinner />}>
                <QueryClientProvider client={queryClient}>
                    <RecoilRoot>
                        <Router>
                            <Routes>
                                <Route path={basename + "/ip-mapping"} element={<IpMapping />} />
                                <Route path={basename + "/custom-popup"} element={<CustomPopup />} />
                                <Route path={basename + "/data-analysis"} element={<DataAnalysis />} />
                                <Route path={basename + "*"} element={<DataAnalysis />} />
                            </Routes>
                        </Router>
                    </RecoilRoot>
                </QueryClientProvider>
            </Suspense>
        </ChakraProvider>
    );
}
