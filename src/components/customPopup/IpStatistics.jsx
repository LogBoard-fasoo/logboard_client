import React, { useEffect } from "react";
import {
    Box,
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
import { getMessage } from "../../services/customPopup/ipMessage";

// export const MESSAGE = {
//     content: "요즈음 [DRM](www.fasoo.com) 제품에 관심이 많으시죠?",
//     validDate: "2023-07-10",
// };

export default function IpStatistics({ ip }) {
    const [customPopupState, setCustomPopupState] = useRecoilState(initialCustomPopupState);
    const { itemsList, startDate, endDate, itemsforTrend } = customPopupState;

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

    useEffect(() => {
        itemsforTrend && refetch();
    }, [itemsforTrend]);

    if (isLoadingByCount || isLoadingByInterest || isLoadingMsg) return <Spinner center={true} />;

    return (
        <Tr>
            <Td colSpan="6" p={0} pt={1}>
                <SmoothTransition>
                    <Wrap>
                        <CustomCard title="메시지">
                            <Stack>
                                {message.data?.message ? (
                                    <>
                                        <Textarea isDisabled={true} type="text" value={message.data.message} />
                                        <CustomDatePicker value={message.data.valid_date} isDisabled={true} />
                                    </>
                                ) : (
                                    <Text>등록된 메시지가 없습니다.</Text>
                                )}
                            </Stack>
                        </CustomCard>

                        <CustomCard title="관심 페이지">
                            <HStack>
                                <Box style={{ width: "100%", height: "550px" }}>
                                    <PieChart key={"piechartInterest"} data={dateByCount?.data} />
                                    <Center w={"100%"}>
                                        <Heading size="xs">관심도 (가중치)</Heading>
                                    </Center>
                                </Box>
                                <Box style={{ width: "100%", height: "550px" }}>
                                    <PieChart key={"piechartCounts"} data={dataByInterest?.data} />
                                    <Center w={"100%"} pb={5}>
                                        <Heading size="xs">방문 횟수</Heading>
                                    </Center>
                                </Box>
                            </HStack>
                        </CustomCard>
                        <CustomCard title="페이지 관심 추세">
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
                # {title}
            </Heading>
            <Box>{children}</Box>
        </Box>
    );
}
