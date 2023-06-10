import React, { useEffect } from "react";
import CustomDropdown from "../common/Dropdown";
import { Box, Flex, Grid, Spacer } from "@chakra-ui/react";
import HBarChart from "../common/HBarChart";
import CustomDateRangePicker from "../common/Datepicker";
import { initialTimeline } from "../../recoil/atoms/specificIndustry";
import { useRecoilState } from "recoil";
import { getAllCategoryTypes, getAllIndsutryTypes, getAllTechnologyTypes } from "../../services/dataAnalysis/types";
import { useQueries, useQuery } from "@tanstack/react-query";

const _data = [
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
    const results = useQueries({
        queries: [
            { queryKey: ["categories"], queryFn: getAllCategoryTypes, staleTime: Infinity },
            { queryKey: ["industries"], queryFn: getAllIndsutryTypes, staleTime: Infinity },
            { queryKey: ["technologies"], queryFn: getAllTechnologyTypes, staleTime: Infinity },
        ],
    });

    const props = [
        {
            placeholder: "카테고리를 검색할 수 있어요.",
            optionsDict: results[0].data?.data,
            data: _data,
        },
        {
            placeholder: "산업군을 검색할 수 있어요.",
            optionsDict: results[1].data?.data,
            data: _data,
        },
        {
            placeholder: "제품 url을 검색할 수 있어요.",
            optionsDict: results[2].data?.data,
            data: _data,
        },
    ];
    const [timeline, setTimeline] = useRecoilState(initialTimeline);

    return (
        <Box>
            <Flex>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
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
