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

    useEffect(() => {
        refetchAll();
    }, [startDate, endDate]);

    const TIPS = [
        { title: "카테고리", tip: "해당 카테고리에 속하는 기업이 파수 제품에 관심이 많습니다." },
        { title: "산업군", tip: "해당 산업군에 속하는 기업이 파수 제품에 관심이 많습니다." },
        { title: "사용기술", tip: "파수 제품에 관심이 많은 기업은 다음 기술을 많이 사용합니다." },
    ];

    return (
        <Box>
            <Flex my={3}>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr" }} gap={4}>
                {TIPS.map((tip, idx) => (
                    <GeneralIndustryBox
                        key={idx}
                        title={tip.title}
                        tooltipContent={
                            <small>
                                <strong>Tip!</strong>
                                <br />
                                <span>{tip.tip}</span>
                            </small>
                        }
                        data={results[idx]?.data?.data}
                    />
                ))}
            </Grid>
        </Box>
    );
}

function GeneralIndustryBox({ data, title, tooltipContent }) {
    return (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
            <Box style={{ width: "100%", height: "400px" }}>
                <Heading as="h3" fontSize="xl" fontWeight="bold">
                    {title}
                    <CustomTooltip tooltipContent={tooltipContent} />
                </Heading>
                <PieChart data={data} />
            </Box>
        </Box>
    );
}
