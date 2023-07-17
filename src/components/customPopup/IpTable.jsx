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
    Button,
    Spinner,
} from "@chakra-ui/react";
import MessageTypeRadioGroup from "./MessageTypeRadioGroup";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SubmimtBtn from "../common/SubmitBtn";
import IpStatistics, { MESSAGE } from "./IpStatistics";
import useReconfirmDialog from "../../hooks/useReconfirmDialog";
import { useRecoilState } from "recoil";
import { initialPopupIpState } from "../../recoil/atoms/popupIpSetting";
import { initialPopupMessageState } from "../../recoil/atoms/popupMessage";
import { updateIpDetail } from "../../services/customPopup/ipItems";
import { getMessage } from "../../services/customPopup/ipMessage";

export default function IpTable() {
    const [isChanged, setIsChanged] = useState(false);
    const [openRow, setOpenRow] = useState(null);
    const [ipList, setIpList] = useRecoilState(initialPopupIpState);
    const [message, setMessage] = useRecoilState(initialPopupMessageState);
    const [checkbox, setCheckbox] = useState(0);
    const [updatedIps, setUpdatedIps] = useState({});
    const [clickedIp, setClickedIp] = useState("");

    const [onOpenSave, ReconfirmDialogOnSave] = useReconfirmDialog(
        "변경 사항을 저장하시겠습니까?",
        "해당 변경 사항은 즉시 유저에게 반영됩니다.",
        () => {
            ipList.map((ip) => updatedIps[ip?.ip] && updateIpDetail(ip.ip, ip.cname, ip.messageType));
            setIsChanged(false);
        },
    );

    const [onOpenMsg, ReconfirmDialogOnMsg] = useReconfirmDialog(
        "메시지를 조회하시겠습니까?",
        "작성 중이던 Message Box를 덮어쓰게됩니다.",
        () => readMessage(clickedIp),
    );

    // const company = [{ ip: "123.20.23.2", cname: "fasoo", messageType: 1 }];
    function changeIps({ ip, cname, messageType, apply }) {
        !apply && !isChanged && setIsChanged(true);
        setUpdatedIps((d) => ({ ...d, [ip]: true }));
        setIpList((prevList) => {
            const newList = [...prevList];
            const idx = newList.findIndex((item) => item.ip === ip);
            newList[idx] = { ...newList[idx], cname: cname ? cname : undefined };
            newList[idx] = { ...newList[idx], messageType: messageType };
            newList[idx] = { ...newList[idx], apply: apply };
            return newList;
        });
    }

    function updateAllValues() {
        const updatedResult = {};
        for (const item of ipList) {
            updatedResult[[item.ip]] = true;
        }
        setUpdatedIps(updatedResult);
        setIsChanged(true);
    }

    function bulkChangeMsgType(e) {
        updateAllValues();
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

    async function readMessage(ip) {
        const { data: message } = await getMessage(ip);
        setMessage((d) => ({ ...d, content: message.message, validDate: message.valid_date, url: message.url }));
    }

    if (!ipList || ipList?.length === 0) return <Spinner />;

    return (
        <TableContainer>
            <Flex>
                <Heading size="md"># IP 테이블</Heading>
                <Spacer />
                <SubmimtBtn onClick={onOpenSave} disabled={!isChanged}>
                    저장
                </SubmimtBtn>
            </Flex>
            <ReconfirmDialogOnSave />
            <ReconfirmDialogOnMsg />
            <Table size="md">
                <Thead bg="blue.600">
                    <Tr>
                        <Th color="white">IP주소</Th>
                        <Th color="white">기업명</Th>
                        <Th color="white">메시지 타입</Th>
                        <Th color="white">횟수</Th>
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
                                일괄
                            </Checkbox>
                            <Checkbox size="md" isChecked={checkbox == 2} value={2} onChange={bulkChangeMsgType}>
                                일괄
                            </Checkbox>
                        </Td>
                        <Td></Td>
                        <Td></Td>
                        <Td>
                            <Checkbox size="md" onChange={bulkChangeMsg}>
                                일괄
                            </Checkbox>
                        </Td>
                    </Tr>
                    {ipList &&
                        ipList.map((company, index) => {
                            const isDisabled = openRow !== index;
                            return (
                                <>
                                    <Tr key={company.ip} bg={isDisabled ? "none" : "yellow.50"}>
                                        <Td>
                                            <Flex>
                                                <HStack
                                                    onClick={
                                                        isDisabled ? () => setOpenRow(index) : () => setOpenRow(null)
                                                    }
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
                                            <Input
                                                maxW={"200px"}
                                                placeholder="기업명을 입력해주세요."
                                                value={company.cname}
                                                onChange={(e) => {
                                                    changeIps({
                                                        ip: company.ip,
                                                        cname: e.target.value,
                                                        messageType: company.messageType,
                                                        apply: company.apply,
                                                    });
                                                }}
                                            />
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
                                        <Td>{company.visits}</Td>
                                        <Td>
                                            {company.hasMessage ? (
                                                <Button
                                                    onClick={() => {
                                                        setClickedIp(company.ip);
                                                        onOpenMsg();
                                                    }}
                                                >
                                                    조회
                                                </Button>
                                            ) : null}
                                        </Td>
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
                                    {!isDisabled && <IpStatistics ip={company.ip} key={company.ip + index} />}
                                </>
                            );
                        })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
