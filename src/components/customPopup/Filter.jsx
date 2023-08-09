import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Card,
    CardBody,
    Checkbox,
    Flex,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    RadioGroup,
    Spacer,
    Spinner,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import CustomDateRangePicker from "../common/Datepicker";
import SearchableDropdown from "../common/SearchableDropdown";
import { initialCustomPopupState } from "../../recoil/atoms/popupFilter";
import CustomTooltip from "../common/Tooltip";
import SubmitBtn from "../common/SubmitBtn";
import GeneralBtn from "../common/GeneralBtn";
import { useQuery } from "@tanstack/react-query";
import { getAllItemsList, getFilteredIps } from "../../services/customPopup/ipItems";
import { initialPopupIpState } from "../../recoil/atoms/popupIpSetting";
import useReconfirmDialog from "../../hooks/useReconfirmDialog";

export default function Filter() {
    const [customPopupState, setCustomPopupState] = useRecoilState(initialCustomPopupState);
    const [ipList, setIpList] = useRecoilState(initialPopupIpState);
    const { hasMessage, hasCompany, counts, interestedProducts, itemsList, startDate, endDate } = customPopupState;

    function saveFilterLs() {
        window.localStorage.setItem("hasMessage", hasMessage);
        window.localStorage.setItem("hasCompany", hasCompany);
        window.localStorage.setItem("counts", counts);
        window.localStorage.setItem("interestedProducts", interestedProducts);
    } // TODO

    const [onOpen, ReconfirmDialog] = useReconfirmDialog(
        "해당 필터 설정을 저장하시겠습니까?",
        "다음 방문에도 같은 필터가 적용됩니다.",
        saveFilterLs,
    );

    const dropDownProps = {
        isMulti: false,
        selectName: "products",
        options: [{ value: 0, label: "/" }, ...itemsList],
        value: interestedProducts,
        placeholder: "페이지 url을 검색할 수 있어요.",
        onChangeFn: (e) => setCustomPopupState((d) => ({ ...d, interestedProducts: e.value })),
    };

    const { data: allItems } = useQuery({
        queryKey: ["getAllItemsList"],
        queryFn: getAllItemsList,
    });

    const {
        data: allIps,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["getFilteredIps"],
        queryFn: () => getFilteredIps(hasMessage, hasCompany, interestedProducts, counts, startDate, endDate),
    });

    useEffect(() => {
        allIps?.data && setIpList(allIps?.data);
    }, [allIps]);

    useEffect(() => {
        allItems?.data && setCustomPopupState((d) => ({ ...d, itemsList: allItems?.data }));
    }, [allItems]);

    useEffect(() => {
        setCustomPopupState((d) => ({ ...d, isFetching: isFetching }));
    }, [isFetching]);

    return (
        <RadioGroup w="100%">
            <ReconfirmDialog />
            <Flex>
                <Heading size="md"># IP 검색 필터</Heading>
                <CustomTooltip
                    tooltipContent={
                        <small>
                            <strong>Tip!</strong>
                            <br />
                            <li>검색 결과 (IP)를 필터링할 수 있어요.</li>
                            <li>필터 선택 후 검색 버튼을 눌러요.</li>
                        </small>
                    }
                />
            </Flex>

            <Flex w="100%">
                <Spacer />
                <CustomDateRangePicker timeline={customPopupState} setTimeline={setCustomPopupState} onlyAllow={null} />
            </Flex>

            <Accordion allowMultiple mt={2}>
                <AccordionItem>
                    <AccordionButton px={0}>
                        <Box flex="1" textAlign="left">
                            <Heading size="md"># 추가 필터</Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={0}>
                        <Card>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing="4">
                                    <Flex w="100%">
                                        <Heading w="40%" size="sm">
                                            메시지 유/무
                                        </Heading>
                                        <Checkbox
                                            w="60%"
                                            size="lg"
                                            isChecked={hasMessage}
                                            value={hasMessage}
                                            onChange={(e) =>
                                                setCustomPopupState((d) => ({ ...d, hasMessage: e.target.checked }))
                                            }
                                        >
                                            <Text fontSize={"sm"}>있음</Text>
                                        </Checkbox>
                                    </Flex>

                                    <Flex w="100%" alignItems={"center"} mt={3}>
                                        <Heading w="40%" size="sm">
                                            매칭 기업 유/무
                                        </Heading>
                                        <Checkbox
                                            w="60%"
                                            size="lg"
                                            isChecked={hasCompany}
                                            value={hasCompany}
                                            onChange={(e) =>
                                                setCustomPopupState((d) => ({ ...d, hasCompany: e.target.checked }))
                                            }
                                        >
                                            <Text fontSize={"sm"}>있음</Text>
                                        </Checkbox>
                                    </Flex>

                                    <Flex w="100%" alignItems={"center"} mt={3}>
                                        <Heading w="40%" size="sm">
                                            방문 페이지
                                        </Heading>
                                        <SearchableDropdown {...dropDownProps} />
                                    </Flex>

                                    <Flex w="100%" alignItems={"center"} mt={2}>
                                        <Heading w="40%" size="sm">
                                            최소 방문 횟수
                                        </Heading>
                                        <NumberInput
                                            defaultValue={counts}
                                            min={1}
                                            onChange={(e) => setCustomPopupState((d) => ({ ...d, counts: e }))}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Flex>
                                </Stack>
                            </CardBody>
                        </Card>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <Flex>
                <GeneralBtn colorScheme={"gray"} onClick={onOpen}>
                    필터 저장
                </GeneralBtn>
                <Spacer />
                <SubmitBtn onClick={refetch}>검색</SubmitBtn>
            </Flex>
        </RadioGroup>
    );
}
