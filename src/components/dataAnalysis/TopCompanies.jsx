import React from "react";
import RankingTable from "../common/RankingTable";
import { Box } from "@mui/material";
import { Flex, Spacer } from "@chakra-ui/react";
import CustomDateRangePicker from "../common/Datepicker";
import { initialTimeline } from "../../recoil/atoms/topCompanies";
import { useRecoilState } from "recoil";

export default function TopCompanies() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);
    return (
        <Box>
            <Flex>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <RankingTable />
        </Box>
    );
}
