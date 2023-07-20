import React, { useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Flex,
    FormLabel,
    HStack,
    Heading,
    Spacer,
    Spinner,
    Stack,
    Td,
    Text,
    Textarea,
    Tr,
    Wrap,
} from "@chakra-ui/react";
import SmoothTransition from "../../styles/animate/SmoothTransition";
import { CustomDatePicker } from "../common/Datepicker";
import PieChart from "../common/PieChart";
import GraphChart from "../common/GraphChart";
import SearchableDropdown from "../common/SearchableDropdown";
import { useRecoilState } from "recoil";
import { initialCustomPopupState } from "../../recoil/atoms/popupFilter";
import { useQuery } from "@tanstack/react-query";
import {
    getIpTopItemsByCount,
    getIpTopItemsByInterest,
    getItemTrendByIp,
} from "../../services/customPopup/ipAnalytics";
import NoResultFound from "../common/NoResultFound";
import { getMessage, resetMessage } from "../../services/customPopup/ipMessage";
import useReconfirmDialog from "../../hooks/useReconfirmDialog";
import { initialPopupIpState } from "../../recoil/atoms/popupIpSetting";

export default function IpStatistics({ ip, setOpenRow }) {
    const [customPopupState, setCustomPopupState] = useRecoilState(initialCustomPopupState);
    const { itemsList, startDate, endDate, itemsforTrend } = customPopupState;
    const [ipList, setIpList] = useRecoilState(initialPopupIpState);

    const dropDownProps = {
        isMulti: false,
        selectName: "products",
        options: itemsList,
        value: itemsforTrend,
        placeholder: "페이지 url을 검색할 수 있어요.",
        onChangeFn: (e) => setCustomPopupState((d) => ({ ...d, itemsforTrend: e.label })),
    };

    const { data: dateByCount, isLoading: isLoadingByCount } = useQuery({
        queryKey: ["getIpTopItemsByCount" + ip],
        queryFn: () => getIpTopItemsByCount(ip, startDate, endDate),
    });

    const { data: dataByInterest, isLoading: isLoadingByInterest } = useQuery({
        queryKey: ["getIpTopItemsByInterest" + ip],
        queryFn: () => getIpTopItemsByInterest(ip, startDate, endDate),
    });

    const { data: dataTrend, refetch } = useQuery({
        enabled: itemsforTrend ? true : false,
        queryKey: ["getItemTrendByIp" + ip],
        queryFn: () => getItemTrendByIp(ip, itemsforTrend, startDate, endDate),
    });

    const { data: message, isLoading: isLoadingMsg } = useQuery({
        queryKey: ["getMessage" + ip],
        queryFn: () => getMessage(ip),
    });

    function deleteMessage() {
        resetMessage(ip).then(() => {
            setIpList((prev) => {
                return prev.map((obj) => {
                    if (obj.ip === ip) {
                        return { ...obj, hasMessage: null }; // 업데이트할 필드 값을 수정
                    }
                    return obj; // 업데이트하지 않을 객체는 그대로 반환
                });
            });
            setOpenRow(null);
        });
    }

    console.log(ipList);
    const [onOpen, ReconfirmDialog] = useReconfirmDialog(
        "해당 메시지를 삭제하시겠습니까?",
        "해당 변경 사항은 즉시 유저에게 반영됩니다.",
        deleteMessage,
    );

    useEffect(() => {
        itemsforTrend && refetch();
    }, [itemsforTrend]);

    if (isLoadingByCount || isLoadingByInterest || isLoadingMsg) return <Spinner center={true} />;

    return (
        <Tr>
            <Td colSpan="8" p={0} pt={1}>
                <ReconfirmDialog />
                <SmoothTransition>
                    <Wrap>
                        {message.data?.message ? (
                            <CustomCard
                                title={
                                    <Flex>
                                        # 메시지
                                        <Spacer />
                                        <Button colorScheme="red" onClick={onOpen}>
                                            삭제
                                        </Button>
                                    </Flex>
                                }
                            >
                                <Stack>
                                    <Textarea
                                        isDisabled={true}
                                        type="text"
                                        value={message.data.message
                                            .replaceAll("<span>", "")
                                            .replaceAll("&nbsp;", " ")
                                            .replaceAll("</span>", "<br/>")}
                                    />
                                    <Textarea isDisabled={true} type="text" value={message.data.url} />
                                    <CustomDatePicker value={message.data.valid_date} isDisabled={true} />
                                </Stack>
                            </CustomCard>
                        ) : (
                            <CustomCard title="메시지">
                                <Stack>
                                    <Text>등록된 메시지가 없습니다.</Text>
                                </Stack>
                            </CustomCard>
                        )}

                        <CustomCard title="# 관심 페이지">
                            <HStack>
                                <Box style={{ width: "100%", height: "350px" }}>
                                    <PieChart
                                        key={"piechartCount"}
                                        data={dateByCount?.data}
                                        includeLegend={false}
                                        bottom={50}
                                    />
                                    <Center w={"100%"}>
                                        <Heading size="xs">방문 횟수</Heading>
                                    </Center>
                                </Box>
                                <Box style={{ width: "100%", height: "350px" }}>
                                    <PieChart
                                        key={"piechartInterest"}
                                        data={dataByInterest?.data}
                                        unit={""}
                                        includeLegend={false}
                                        bottom={50}
                                    />
                                    <Center w={"100%"} pb={5}>
                                        <Heading size="xs">관심도 (가중치)</Heading>
                                    </Center>
                                </Box>
                            </HStack>
                        </CustomCard>
                        <CustomCard title=" # 페이지 관심 추세">
                            <Box maxW={"1100px"} height={"500px"} pb={10}>
                                <Flex>
                                    <Spacer />
                                    <SearchableDropdown {...dropDownProps} />
                                </Flex>
                                {dataTrend?.data ? (
                                    <GraphChart x={"날짜"} y={"방문횟수"} data={[dataTrend.data]} />
                                ) : (
                                    <NoResultFound />
                                )}
                            </Box>
                        </CustomCard>
                    </Wrap>
                </SmoothTransition>
            </Td>
        </Tr>
    );
}

function CustomCard({ title, children }) {
    return (
        <Box w={"100%"} bg="white" p={5} m={0}>
            <Heading size="sm" my={2}>
                {title}
            </Heading>
            <Box>{children}</Box>
        </Box>
    );
}
