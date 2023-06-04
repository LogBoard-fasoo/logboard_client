import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mapping from "./components/pages/Mapping";
import DataAnalysis from "./components/pages/DataAnalysis";

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/mapping" element={<Mapping />} />
                    <Route path="/data-analysis" element={<DataAnalysis />} />
                    <Route path="*" element={<DataAnalysis />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}
