import React from "react";
import RankingTable from "../common/RankingTable";
import { Box } from "@mui/material";
import { Flex, Spacer } from "@chakra-ui/react";
import CustomDateRangePicker from "../common/Datepicker";
import { initialTimeline } from "../../recoil/atoms/topCompanies";
import { useRecoilState } from "recoil";
import SummaryBox from "./SummaryBox";
import useSummarizeTimeline from "../../hooks/useSummarizeTimeline";
import { getTop5CompaniesName } from "../utils/summarizeKeys";

export default function TopCompanies() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);
    const timelineStr = useSummarizeTimeline(initialTimeline);

    const summaryContent = {
        기업랭킹: `${timelineStr} 간 파수에 가장 큰 관심을 보인 기업은 ${getTop5CompaniesName()} 입니다.`,
    };

    return (
        <Box>
            <Flex my={3}>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <RankingTable timeline={timeline} />
            <SummaryBox summaryContent={summaryContent} />
        </Box>
    );
}
