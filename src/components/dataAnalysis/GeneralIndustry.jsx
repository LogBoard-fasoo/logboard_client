import React, { useCallback, useEffect } from "react";
import { Box, Flex, Grid, Heading, Spacer } from "@chakra-ui/react";
import PieChart from "../common/PieChart";
import CustomTooltip from "../common/Tooltip";
import CustomDateRangePicker from "../common/Datepicker";
import { useRecoilState } from "recoil";
import { initialTimeline } from "../../recoil/atoms/generalIndustry";
import { getCountsByCategory, getCountsByIndustry, getCountsByTechnology } from "../../services/dataAnalysis/visitors";
import { useQueries } from "@tanstack/react-query";

export default function GeneralIndustry() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);
    const { startDate, endDate } = timeline;
    const refetchAll = useCallback(() => {
        results.forEach((result) => result.refetch());
    });

    const results = useQueries({
        queries: [
            {
                queryKey: ["generalCategoryData"],
                queryFn: () => getCountsByCategory(5, startDate, endDate),
                suspense: true,
            },
            {
                queryKey: ["generalIndustryIndustry"],
                queryFn: () => getCountsByIndustry(5, startDate, endDate),
                suspense: true,
            },
            {
                queryKey: ["generalTechnologyData"],
                queryFn: () => getCountsByTechnology(5, startDate, endDate),
                suspense: true,
            },
        ],
    });

    const props = [
        { title: "카테고리", data: results[0]?.data?.data },
        { title: "산업군", data: results[1]?.data?.data },
        { title: "사용기술", data: results[2]?.data?.data },
    ];

    useEffect(() => {
        refetchAll();
    }, [startDate, endDate]);

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
