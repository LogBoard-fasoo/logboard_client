import React, { useEffect } from "react";
import CustomDropdown from "../common/Dropdown";
import { Box, Flex, Grid, Spacer } from "@chakra-ui/react";
import HBarChart from "../common/HBarChart";
import CustomDateRangePicker from "../common/Datepicker";
import { initialTimeline } from "../../recoil/atoms/specificIndustry";
import { useRecoilState } from "recoil";
import { getAllCategoryTypes } from "../../services/dataAnalysis/types";
import { useQuery } from "@tanstack/react-query";

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
    const { data } = useQuery("categories", getAllCategoryTypes, {
        refetchOnWindowFocus: false, // 완료 후 실행할 함수
        retry: 1, // 실패 시 1번 재호출
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (e) => {
            console.log(e.message);
        },
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const props = [
        { placeholder: "카테고리를 검색할 수 있어요.", optionsDict: { 1: "전자", 2: "음식" }, data: _data },
        { placeholder: "산업군을 검색할 수 있어요.", optionsDict: { 1: "전자", 2: "음식" }, data: _data },
        { placeholder: "제품 url을 검색할 수 있어요.", optionsDict: { 1: "전자", 2: "음식" }, data: _data },
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
