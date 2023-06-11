import React, { useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
    Link,
    Button,
    Card,
    CardHeader,
    Heading,
    CardBody,
    Wrap,
    HStack,
} from "@chakra-ui/react";
import MessageTypeRadioGroup from "./MessageTypeRadioGroup";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const data = [
    {
        ipAddress: "168.92.10.201",
        cname: "Pana",
        messageType: "Company",
        message: 180,
        validDate: 180,
    },
    {
        ipAddress: "168.92.40.201",
        cname: "Fasoo",
        messageType: "Company",
        message: 180,
        validDate: 180,
    },
    {
        ipAddress: "168.92.10.201",
        cname: "Sparrow",
        messageType: "Company",
        message: 180,
        validDate: 180,
    },
    {
        ipAddress: "168.92.20.201",
        cname: "SK",
        messageType: "Company",
        message: 180,
        validDate: 180,
    },
    {
        ipAddress: "168.92.30.201",
        cname: "CJ",
        messageType: "Company",
        message: 180,
        validDate: 180,
    },
    {
        ipAddress: "168.92.30.201",
        cname: "CJ",
        messageType: "Company",
        message: 180,
        validDate: 180,
    },
    {
        ipAddress: "168.92.30.201",
        cname: "CJ",
        messageType: "Company",
        message: 180,
        validDate: 180,
    },
];

const cnames = [
    {
        cname: "CJ",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
    {
        cname: "SK",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
    {
        cname: "Fasoo",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
    {
        cname: "LG",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
];

export default function IpMappingTable() {
    const [openRow, setOpenRow] = useState(null);

    return (
        <TableContainer>
            <Table size="md">
                <Thead bg="blue.600">
                    <Tr>
                        <Th color="white">IP주소</Th>
                        <Th color="white">유추기업명</Th>
                        <Th color="white">메시지타입</Th>
                        <Th color="white">메시지</Th>
                        <Th color="white">유효일자</Th>
                        <Th color="white" isNumeric></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((company, index) => {
                        return (
                            <>
                                <Tr key={Math.random().toString()}>
                                    <Td>
                                        &nbsp;
                                        <HStack
                                            onClick={
                                                openRow === index ? () => setOpenRow(null) : () => setOpenRow(index)
                                            }
                                        >
                                            <small>{index + 1}</small>
                                            <Text as="b" cursor="pointer" color="text_grey">
                                                {company.ipAddress}
                                            </Text>
                                            {openRow === index ? <FiChevronUp /> : <FiChevronDown />}
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <Link rel="noreferrer" target="_blank">
                                            {company.cname}
                                        </Link>
                                    </Td>
                                    <Td>
                                        <MessageTypeRadioGroup />
                                    </Td>
                                    <Td>{company.message}</Td>
                                    <Td>{company.validDate}</Td>
                                    <Td isNumeric>
                                        <Button colorScheme="blue">저장</Button>
                                    </Td>
                                </Tr>
                                {openRow === index ? (
                                    <Tr key={Math.random().toString()}>
                                        <Td colspan="7">
                                            <small>의심 매칭 기업</small>
                                            <Wrap>
                                                {cnames.map((cname, index) => (
                                                    <Card variant="elevated" key={index}>
                                                        <CardHeader>
                                                            <Heading size="md">{cname.cname}</Heading>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Text>도메인: {cname.domain}</Text>
                                                            <Text>직원규모: {cname.employeeRange}</Text>
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                            </Wrap>
                                        </Td>
                                    </Tr>
                                ) : null}
                            </>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
