import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomPopup from "./components/pages/CustomPopup";
import DataAnalysis from "./components/pages/DataAnalysis";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomSpinner from "./components/common/Spinner";
import { authenticateUser } from "./services/authenticate";

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
    const [permission, setPermission] = useState(null);

    useEffect(() => {
        authenticateUser().then((res) => {
            setPermission(res.data.permission);
        });
    }, []);

    if (permission === "X") return <Box>권한없음.</Box>;

    return (
        <ChakraProvider theme={theme}>
            <Suspense fallback={<CustomSpinner />}>
                <QueryClientProvider client={queryClient}>
                    <RecoilRoot>
                        <Router>
                            <Routes>
                                <Route path={basename + "/marketing-popup"} element={<CustomPopup />} />
                                <Route path={basename + "/data-analysis"} element={<DataAnalysis />} />
                                <Route path={basename + "*"} element={<CustomPopup />} />
                            </Routes>
                        </Router>
                    </RecoilRoot>
                </QueryClientProvider>
            </Suspense>
        </ChakraProvider>
    );
}
