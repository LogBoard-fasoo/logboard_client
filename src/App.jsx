import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IpMapping from "./components/pages/IpMapping";
import DataAnalysis from "./components/pages/DataAnalysis";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <Router>
                        <Routes>
                            <Route path="/ip-mapping" element={<IpMapping />} />
                            <Route path="/data-analysis" element={<DataAnalysis />} />
                            <Route path="*" element={<DataAnalysis />} />
                        </Routes>
                    </Router>
                </RecoilRoot>
            </QueryClientProvider>
        </ChakraProvider>
    );
}
