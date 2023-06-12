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
} from "@chakra-ui/react";
import MessageTypeRadioGroup from "./MessageTypeRadioGroup";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { CustomDatePicker } from "../common/Datepicker";
import SmoothTransition from "../../styles/animate/SmoothTransition";

const data = [
    {
        ipAddress: "168.92.10.201",
        cname: "Pana",
        messageType: "Company",
        message: "SAST 제품에 관심이 있으신가요?",
        validDate: 180,
    },
    {
        ipAddress: "168.92.40.201",
        cname: "Fasoo",
        messageType: "Company",
        message: "",
        validDate: 180,
    },
    {
        ipAddress: "168.92.10.201",
        cname: "Sparrow",
        messageType: "Company",
        message: "",
        validDate: 180,
    },
    {
        ipAddress: "168.92.20.201",
        cname: "SK",
        messageType: "Company",
        message: "",
        validDate: 180,
    },
    {
        ipAddress: "168.92.30.201",
        cname: "CJ",
        messageType: "Company",
        message: "",
        validDate: 180,
    },
    {
        ipAddress: "168.92.30.201",
        cname: "CJ",
        messageType: "Company",
        message: "",
        validDate: 180,
    },
    {
        ipAddress: "168.92.30.201",
        cname: "CJ",
        messageType: "Company",
        message: "",
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
                        const isDisabled = openRow !== index;
                        return (
                            <>
                                <Tr key={Math.random().toString() + index}>
                                    <Td>
                                        <HStack onClick={isDisabled ? () => setOpenRow(index) : () => setOpenRow(null)}>
                                            <small>{index + 1}</small>
                                            <Text as="b" cursor="pointer" color="text_grey">
                                                {company.ipAddress}
                                            </Text>
                                            {isDisabled ? <FiChevronDown /> : <FiChevronUp />}
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <Link rel="noreferrer" target="_blank">
                                            <Input
                                                disabled={isDisabled}
                                                placeholder="유추기업명을 입력해주세요."
                                                value={company.cname}
                                            />
                                        </Link>
                                    </Td>
                                    <Td>
                                        <MessageTypeRadioGroup isDisabled={isDisabled} />
                                    </Td>
                                    <Td>
                                        <Textarea
                                            disabled={isDisabled}
                                            placeholder="커스텀 메시지를 작성해주세요."
                                            value={company.message}
                                        />
                                    </Td>
                                    <Td>
                                        <CustomDatePicker isDisabled={isDisabled} />
                                    </Td>
                                    <Td isNumeric>
                                        <Button isDisabled={isDisabled} colorScheme="blue">
                                            저장
                                        </Button>
                                    </Td>
                                </Tr>
                                {!isDisabled ? (
                                    <Tr key={Math.random().toString()}>
                                        <Td colSpan="7">
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
