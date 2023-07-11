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
    Card,
    CardHeader,
    Heading,
    CardBody,
    Wrap,
    HStack,
    Checkbox,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import MessageTypeRadioGroup from "../mapping/MessageTypeRadioGroup";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SubmimtBtn from "../common/SubmitBtn";
import IpStatistics from "./IpStatistics";
import useReconfirmDialog from "../../hooks/useReconfirmDialog";

const data = [
    {
        ip: "168.92.10.201",
        cname: "Pana",
        hasMessage: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ip: "168.92.40.201",
        cname: "Fasoo",
        hasMessage: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ip: "168.92.10.201",
        cname: "Sparrow",
        hasMessage: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ip: "168.92.20.201",
        cname: "SK",
        hasMessage: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ip: "168.92.30.201",
        cname: null,
        hasMessage: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ip: "168.92.30.201",
        cname: "CJ",
        hasMessage: "Y",
        messageType: "Company",
        validDate: 180,
    },
    {
        ip: "168.92.30.201",
        cname: null,
        hasMessage: "Y",
        messageType: "Company",
        validDate: 180,
    },
];

export default function IpTable() {
    const [openRow, setOpenRow] = useState(null);

    const [onOpen, ReconfirmDialog] = useReconfirmDialog(
        "변경 사항을 저장하시겠습니까?",
        "해당 변경 사항은 유저에게 즉시 반영됩니다.",
        () => console.log("저장되었습니다"),
    );

    return (
        <TableContainer>
            <Flex>
                <Heading size="md"># IP 테이블</Heading>
                <Spacer />
                <SubmimtBtn onClick={onOpen}>저장</SubmimtBtn>
            </Flex>
            <ReconfirmDialog />
            <Table size="md">
                <Thead bg="blue.600">
                    <Tr>
                        <Th color="white">IP주소</Th>
                        <Th color="white">기업명</Th>
                        <Th color="white">메시지 타입</Th>
                        <Th color="white">메시지</Th>
                        <Th color="white">적용</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td>
                            <MessageTypeRadioGroup option1={"전체"} option2={"전체"} />
                        </Td>
                        <Td></Td>
                        <Td>
                            <Checkbox>전체</Checkbox>
                        </Td>
                    </Tr>
                    {data.map((company, index) => {
                        const isDisabled = openRow !== index;
                        return (
                            <>
                                <Tr key={company.ip}>
                                    <Td>
                                        <Flex>
                                            <HStack
                                                onClick={isDisabled ? () => setOpenRow(index) : () => setOpenRow(null)}
                                            >
                                                <small>{index + 1}</small>
                                                <Text as="b" cursor="pointer" color="text_grey">
                                                    {company.ip}
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
                                        <MessageTypeRadioGroup option1={"개인"} option2={"기업"} />
                                    </Td>
                                    <Td>{company.hasMessage}</Td>
                                    <Td>
                                        <Checkbox></Checkbox>
                                    </Td>
                                </Tr>
                                {!isDisabled && <IpStatistics ip={company.ip} key={company.ip} />}
                            </>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
