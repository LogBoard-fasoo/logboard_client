import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Link } from "@chakra-ui/react";
import { getTop30Companies } from "../../services/dataAnalysis/companies";
import { initialTimeline } from "../../recoil/atoms/topCompanies";
import { useRecoilState } from "recoil";
import SmoothTransition from "../../styles/animate/SmoothTransition";

const data = [
    {
        cname: "Pana",
        domain: "www.pana.com",
        country: "United states",
        visits: 180,
    },
    {
        cname: "SK",
        domain: "www.sk.com",
        country: "Korea",
        visits: 140,
    },
    {
        cname: "CJ",
        domain: "www.cj.com",
        country: "Korea",
        visits: 100,
    },
    {
        cname: "SK",
        domain: "www.cj.com",
        country: "Korea",
        visits: 20,
    },
];

export default function RankingTable({ timeline }) {
    const { startDate, endDate } = timeline;
    const [topCompanies, setTopCompanies] = useState([]);

    useEffect(() => {
        getTop30Companies(startDate, endDate).then((res) => setTopCompanies(res.data));
    }, []);

    useEffect(() => {
        getTop30Companies(startDate, endDate).then((res) => setTopCompanies(res.data));
    }, [startDate, endDate]);

    return (
        <SmoothTransition>
            <TableContainer borderRadius={7}>
                <Table size="md">
                    <Thead bg="blue.600">
                        <Tr>
                            <Th color="white">Company</Th>
                            <Th color="white">Domain</Th>
                            <Th color="white">Country</Th>
                            <Th color="white" isNumeric>
                                Counts
                            </Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody bg="white">
                        {topCompanies.map((company, index) => (
                            <Tr key={Math.random().toString()}>
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
        </SmoothTransition>
    );
}
