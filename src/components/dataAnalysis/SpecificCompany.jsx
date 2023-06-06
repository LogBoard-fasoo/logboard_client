import React from "react";
import GraphChart from "../common/GraphChart";
import { Box, Grid, HStack, Heading } from "@chakra-ui/react";
import SearchableDropdown from "../common/SearchableDropdown";
import PieChart from "../common/PieChart";

const data = [
    {
        id: "elixir",
        value: 51,
    },
    {
        id: "java",
        value: 264,
    },
    {
        id: "php",
        value: 112,
    },
    {
        id: "haskell",
        value: 534,
    },
    {
        id: "c",
        value: 526,
    },
];

const data1 = [
    {
        id: "파수",
        data: [
            {
                x: "4/7",
                y: 284,
            },
            {
                x: "4/14",
                y: 243,
            },
            {
                x: "4/21",
                y: 210,
            },
            {
                x: "4/28",
                y: 26,
            },
            {
                x: "4/28",
                y: 26,
            },
            {
                x: "4/28",
                y: 26,
            },
        ],
    },
    {
        id: "스패로우",
        data: [
            {
                x: "4/7",
                y: 600,
            },
            {
                x: "4/14",
                y: 30,
            },
            {
                x: "4/21",
                y: 210,
            },
            {
                x: "4/28",
                y: 35,
            },
            {
                x: "4/28",
                y: 20,
            },
            {
                x: "4/28",
                y: 26,
            },
        ],
    },
];

export default function SpecificCompany() {
    return (
        <Box>
            <Grid templateColumns={{ base: "1fr" }} gap={4}>
                <SearchableDropdown />
                <GraphBox data={data1} />
                <PieBox />
            </Grid>
        </Box>
    );
}

function GraphBox({ data }) {
    return (
        <Box style={{ width: "100%", height: "500px" }} bg="white" boxShadow="base" p="6" rounded="md">
            <Heading as="h5" fontSize="xl">
                주별 방문 트렌드
            </Heading>
            <GraphChart data={data} />
        </Box>
    );
}

function PieBox() {
    return (
        <HStack>
            <Box style={{ width: "100%", height: "500px" }} bg="white" boxShadow="base" p="6" rounded="md">
                <Heading as="h5" fontSize="xl">
                    관심 제품군
                </Heading>
                <PieChart data={data} />
            </Box>
            <Box style={{ width: "100%", height: "500px" }} bg="white" boxShadow="base" p="6" rounded="md">
                <Heading as="h5" fontSize="xl">
                    관심제품 Top 5
                </Heading>
                <PieChart data={data} />
            </Box>
        </HStack>
    );
}
