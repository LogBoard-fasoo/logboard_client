import React from "react";
import CustomDropdown from "../common/Dropdown";
import { Box, Grid } from "@chakra-ui/react";
import HBarChart from "../common/HBarChart";

const data = [
    {
        방문수: "AD",
        전자: 4,
    },
    {
        방문수: "AE",
        전자: 2,
    },
    {
        방문수: "AG",
        전자: 10,
    },
    {
        방문수: "AI",
        전자: 5,
    },
    {
        방문수: "AL",
        전자: 8,
    },
    {
        방문수: "AM",
        전자: 9,
    },
];

export default function SpecificIndustry() {
    const props = [
        { placeholder: "카테고리", optionsDict: { 1: "전자", 2: "음식" }, data: data },
        { placeholder: "산업군", optionsDict: { 1: "전자", 2: "음식" }, data: data },
        { placeholder: "제품", optionsDict: { 1: "전자", 2: "음식" }, data: data },
    ];
    return (
        <Box>
            <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr" }} gap={4}>
                {props.map((prop, idx) => (
                    <SpecificIndustryBox key={idx} {...prop} />
                ))}
            </Grid>
        </Box>
    );
}

function SpecificIndustryBox({ placeholder, optionsDict, data }) {
    return (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
            <CustomDropdown placeholder={placeholder} optionsDict={optionsDict} />
            <Box style={{ width: "100%", height: "400px" }}>
                <HBarChart data={data} />
            </Box>
        </Box>
    );
}
