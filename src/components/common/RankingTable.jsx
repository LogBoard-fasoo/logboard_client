import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Link } from "@chakra-ui/react";

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

export default function RankingTable() {
    return (
        <TableContainer>
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
                <Tbody>
                    {data.map((company, index) => (
                        <Tr key={Math.random().toString()}>
                            <Td>
                                <small>{index + 1}</small>
                                &nbsp;
                                <Text as="b" cursor="pointer" color="text_grey">
                                    {company.cname}
                                </Text>
                            </Td>
                            <Td>
                                <Link rel="noreferrer" target="_blank" href={company.domain}>
                                    {company.domain}
                                </Link>
                            </Td>
                            <Td>{company.country}</Td>
                            <Td isNumeric>{company.visits}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
