import React from "react";
import { Box, Flex, Grid, Heading, Spacer } from "@chakra-ui/react";
import PieChart from "../common/PieChart";
import CustomTooltip from "../common/Tooltip";
import CustomDateRangePicker from "../common/Datepicker";
import { useRecoilState } from "recoil";
import { initialTimeline } from "../../recoil/atoms/generalIndustry";

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

export default function GeneralIndustry() {
    const props = [
        { title: "카테고리", data: data },
        { title: "산업군", data: data },
        { title: "사용기술", data: data },
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
                    <GeneralIndustryBox key={idx} {...prop} />
                ))}
            </Grid>
        </Box>
    );
}

function GeneralIndustryBox({ data, title }) {
    return (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
            <Box style={{ width: "100%", height: "400px" }}>
                <Heading as="h3" fontSize="xl" fontWeight="bold">
                    {title}
                    <CustomTooltip tooltipContent={"Tip!"} />
                </Heading>
                <PieChart data={data} />
            </Box>
        </Box>
    );
}
