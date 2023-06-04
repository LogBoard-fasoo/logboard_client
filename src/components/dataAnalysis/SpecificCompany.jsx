import React from "react";
import GraphChart from "../common/GraphChart";
import { Box, Grid } from "@chakra-ui/react";
import SearchableDropdown from "../common/SearchableDropdown";

export default function SpecificCompany() {
    return (
        <Box>
            <Grid templateColumns={{ base: "1fr" }} gap={4}>
                <GraphBox />
            </Grid>
        </Box>
    );
}

function GraphBox() {
    return (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
            <SearchableDropdown />
            <Box style={{ width: "100%", height: "500px" }}>
                <GraphChart />
            </Box>
        </Box>
    );
}
