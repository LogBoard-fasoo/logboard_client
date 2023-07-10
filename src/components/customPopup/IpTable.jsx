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
    Textarea,
    Input,
    Checkbox,
    Flex,
} from "@chakra-ui/react";
import MessageTypeRadioGroup from "../mapping/MessageTypeRadioGroup";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { CustomDatePicker } from "../common/Datepicker";
import SmoothTransition from "../../styles/animate/SmoothTransition";

const data = [
    {
        ipAddress: "168.92.10.201",
        cname: "Pana",
        message: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ipAddress: "168.92.40.201",
        cname: "Fasoo",
        message: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ipAddress: "168.92.10.201",
        cname: "Sparrow",
        message: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ipAddress: "168.92.20.201",
        cname: "SK",
        message: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ipAddress: "168.92.30.201",
        cname: "CJ",
        message: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ipAddress: "168.92.30.201",
        cname: "CJ",
        message: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ipAddress: "168.92.30.201",
        cname: "CJ",
        message: "Y",
        messageType: "Company",
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

export default function IpTable() {
    const [openRow, setOpenRow] = useState(null);

    return (
        <TableContainer>
            <Heading size="md">#IP 테이블</Heading>
            <Table size="md">
                <Thead bg="blue.600">
                    <Tr>
                        <Th color="white">
                            <Checkbox>전체</Checkbox>
                        </Th>
                        <Th color="white">IP주소</Th>
                        <Th color="white">기업명</Th>
                        <Th color="white">메시지 타입</Th>
                        <Th color="white">메시지 유/무</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((company, index) => {
                        const isDisabled = openRow !== index;
                        return (
                            <>
                                <Tr key={Math.random().toString() + index}>
                                    <Td>
                                        <Checkbox></Checkbox>
                                    </Td>
                                    <Td>
                                        <Flex>
                                            <HStack
                                                onClick={isDisabled ? () => setOpenRow(index) : () => setOpenRow(null)}
                                            >
                                                <small>{index + 1}</small>
                                                <Text as="b" cursor="pointer" color="text_grey">
                                                    {company.ipAddress}
                                                </Text>
                                                {isDisabled ? <FiChevronDown /> : <FiChevronUp />}
                                            </HStack>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Link rel="noreferrer" target="_blank">
                                            {company.cname}
                                        </Link>
                                    </Td>
                                    <Td>
                                        <MessageTypeRadioGroup isDisabled={isDisabled} />
                                    </Td>
                                    <Td>{company.message}</Td>
                                </Tr>
                                {!isDisabled ? (
                                    <Tr key={Math.random().toString()}>
                                        <Td colSpan="8">
                                            <SmoothTransition>
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
                                            </SmoothTransition>
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
