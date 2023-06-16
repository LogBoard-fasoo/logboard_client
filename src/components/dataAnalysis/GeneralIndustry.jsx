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

    return (
        <Box>
            <Flex>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr" }} gap={4}>
                <GeneralIndustryBox
                    key={"카테고리"}
                    title={"카테고리"}
                    tooltipContent={
                        <small>
                            Tip! <br />
                            해당 카테고리에 속하는 기업이 파수 제품에 관심이 많습니다.
                        </small>
                    }
                    data={results[0]?.data?.data}
                />
                <GeneralIndustryBox key={"산업군"} title={"산업군"} tooltipContent={""} data={results[1]?.data?.data} />
                <GeneralIndustryBox
                    key={"사용기술"}
                    title={"사용기술"}
                    tooltipContent={""}
                    data={results[2]?.data?.data}
                />
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
