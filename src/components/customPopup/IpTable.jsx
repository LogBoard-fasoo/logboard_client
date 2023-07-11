import React, { useEffect, useState } from "react";
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
    Heading,
    HStack,
    Checkbox,
    Flex,
    Spacer,
    Input,
} from "@chakra-ui/react";
import MessageTypeRadioGroup from "../mapping/MessageTypeRadioGroup";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SubmimtBtn from "../common/SubmitBtn";
import IpStatistics from "./IpStatistics";
import useReconfirmDialog from "../../hooks/useReconfirmDialog";
import { useRecoilState } from "recoil";
import { initialPopupMessageState } from "../../recoil/atoms/popupMessage";

const ipsFetched = [
    {
        ip: "168.92.10.201",
        cname: "Pana",
        hasMessage: "Y",
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.40.202",
        cname: "Fasoo",
        hasMessage: "Y",
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.10.203",
        cname: "Sparrow",
        hasMessage: "Y",
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.20.204",
        cname: "SK",
        hasMessage: "Y",
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.30.205",
        cname: null,
        hasMessage: "Y",
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.30.206",
        cname: "CJ",
        hasMessage: "Y",
        messageType: 1,
        apply: false,
    },
    {
        ip: "168.92.30.207",
        cname: null,
        hasMessage: "Y",
        messageType: 1,
        apply: false,
    },
];

export default function IpTable() {
    const [isChanged, setIsChanged] = useState(false);
    const [openRow, setOpenRow] = useState(null);
    const [ipList, setIpList] = useState(ipsFetched);
    const [checkbox, setCheckbox] = useState(0);

    const [onOpen, ReconfirmDialog] = useReconfirmDialog(
        "변경 사항을 저장하시겠습니까?",
        "해당 변경 사항은 유저에게 즉시 반영됩니다.",
        () => console.log("저장되었습니다"),
    );

    // const company = [{ ip: "123.20.23.2", cname: "fasoo", messageType: 1 }];
    function changeIps({ ip, cname, messageType, apply }) {
        ip || cname || messageType || isChanged || setIsChanged(true);
        setIpList((prevList) => {
            const newList = [...prevList];
            const idx = newList.findIndex((item) => item.ip === ip);
            if (cname) newList[idx] = { ...newList[idx], cname: cname };
            else if (messageType) newList[idx] = { ...newList[idx], messageType: messageType };
            newList[idx] = { ...newList[idx], apply: apply };
            return newList;
        });
    }

    function bulkChangeMsgType(e) {
        if (e.target.checked) {
            setIpList((prevList) => {
                return prevList.map((item) => ({ ...item, messageType: parseInt(e.target.value) }));
            });
            setCheckbox(parseInt(e.target.value));
        } else {
            setCheckbox(0);
        }
    }

    function bulkChangeMsg(e) {
        if (e.target.checked) {
            setIpList((prevList) => {
                return prevList.map((item) => ({ ...item, apply: true }));
            });
        } else {
            setIpList((prevList) => {
                return prevList.map((item) => ({ ...item, apply: false }));
            });
        }
    }

    console.log(ipList);

    return (
        <TableContainer>
            <Flex>
                <Heading size="md"># IP 테이블</Heading>
                <Spacer />
                <SubmimtBtn onClick={onOpen} disabled={!isChanged}>
                    저장
                </SubmimtBtn>
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
                            <Checkbox size="md" isChecked={checkbox == 1} value={1} onChange={bulkChangeMsgType} mr={3}>
                                개인
                            </Checkbox>
                            <Checkbox size="md" isChecked={checkbox == 2} value={2} onChange={bulkChangeMsgType}>
                                기업
                            </Checkbox>
                        </Td>
                        <Td></Td>
                        <Td>
                            <Checkbox size="md" onChange={bulkChangeMsg}>
                                일괄
                            </Checkbox>
                        </Td>
                    </Tr>
                    {ipList.map((company, index) => {
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
                                            <Input
                                                placeholder="유추기업명을 입력해주세요."
                                                value={company.cname}
                                                onChange={(e) =>
                                                    changeIps({
                                                        ip: company.ip,
                                                        cname: e.target.value,
                                                        messageType: company.messageType,
                                                        apply: company.apply,
                                                    })
                                                }
                                            />
                                        </Link>
                                    </Td>
                                    <Td>
                                        <MessageTypeRadioGroup
                                            optionLst={["개인", "기업"]}
                                            value={company.messageType}
                                            onChange={(e) =>
                                                changeIps({
                                                    ip: company.ip,
                                                    cname: company.cname,
                                                    messageType: parseInt(e),
                                                    apply: company.apply,
                                                })
                                            }
                                        />
                                    </Td>
                                    <Td>{company.hasMessage}</Td>
                                    <Td>
                                        <Checkbox
                                            isChecked={company.apply}
                                            onChange={(e) =>
                                                changeIps({
                                                    ip: company.ip,
                                                    cname: company.cname,
                                                    messageType: company.messageType,
                                                    apply: e.target.checked,
                                                })
                                            }
                                        />
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
