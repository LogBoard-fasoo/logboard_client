import React, { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Link } from "@chakra-ui/react";
import { getTop30Companies } from "../../services/dataAnalysis/companies";
import SmoothTransition from "../../styles/animate/SmoothTransition";
import { useQuery } from "@tanstack/react-query";
import SummaryBox from "../dataAnalysis/SummaryBox";
import useSummarizeTimeline from "../../hooks/useSummarizeTimeline";
import { getTop5CompaniesName } from "../utils/summarizeKeys";

export default function RankingTable({ timeline }) {
    const { startDate, endDate } = timeline;
    const timelineStr = useSummarizeTimeline(startDate, endDate);
    const summaryContent = {
        기업랭킹: `${timelineStr} 간 파수에 가장 큰 관심을 보인 기업은 ${getTop5CompaniesName()} 입니다.`,
    };

    const { data, refetch } = useQuery({
        queryKey: ["getTop30Companies"],
        queryFn: () => getTop30Companies(startDate, endDate),
    });

    useEffect(() => {
        refetch();
    }, [startDate, endDate]);

    return (
        <SmoothTransition>
            <TableContainer
                borderRadius={7}
                h="500px"
                overflowY="scroll"
                css={{
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#F7FAFC",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#CBD5E0",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#A0AEC0",
                    },
                }}
            >
                <Table size="md">
                    <Thead bg="blue.600">
                        <Tr>
                            <Th color="white">Company</Th>
                            <Th color="white">Domain</Th>
                            <Th color="white">Country</Th>
                            <Th color="white">Industry</Th>
                            <Th color="white" isNumeric>
                                Counts
                            </Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody bg="white">
                        {data?.data.map((company, index) => (
                            <Tr key={Math.random().toString()} bg={index < 5 ? "yellow.100" : "none"}>
                                <Td>
                                    <small>{company.rank}</small>
                                    &nbsp;&nbsp;
                                    <Text as="b" cursor="pointer" color="text_grey">
                                        {company.name}
                                    </Text>
                                </Td>
                                <Td>
                                    <Link rel="noreferrer" target="_blank" href={"https://" + company.domain}>
                                        {company.domain}
                                    </Link>
                                </Td>
                                <Td>{company.country}</Td>
                                <Td>{company.industry}</Td>
                                <Td isNumeric>
                                    <Text as="b" color="blue.600">
                                        {company.count}
                                    </Text>
                                </Td>
                                <Td></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <SummaryBox summaryContent={summaryContent} />
        </SmoothTransition>
    );
}
