import React from "react";
import GraphChart from "../common/GraphChart";
import { Box, Flex, Grid, HStack, Heading, Spacer } from "@chakra-ui/react";
import SearchableDropdown from "../common/SearchableDropdown";
import PieChart from "../common/PieChart";
import CustomDateRangePicker from "../common/Datepicker";
import { initialTimeline } from "../../recoil/atoms/specificCompany";
import { useRecoilState } from "recoil";

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
    const [timeline, setTimeline] = useRecoilState(initialTimeline);

    const companies = [
        { value: 0, label: "Fasoo" },
        { value: 1, label: "Sparrow" },
        { value: 2, label: "Clearbit" },
        { value: 3, label: "Amazon" },
        { value: 4, label: "Google" },
        { value: 5, label: "Naver" },
    ];

    const dropDownProps = {
        isMulti: true,
        selectName: "companies",
        options: companies,
        placeholder: "기업을 검색할 수 있어요.",
    };
    return (
        <Box>
            <Flex>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <Grid templateColumns={{ base: "1fr" }} gap={4}>
                <SearchableDropdown {...dropDownProps} />
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
