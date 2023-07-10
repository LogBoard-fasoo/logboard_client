import React from "react";
import { useRecoilState } from "recoil";
import {
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
    Text,
} from "@chakra-ui/react";
import CustomDateRangePicker from "../common/Datepicker";
import SearchableDropdown from "../common/SearchableDropdown";
import { initialCustomPopupState } from "../../recoil/customPopup";

export default function Filter() {
    const [customPopupState, setCustomPopupState] = useRecoilState(initialCustomPopupState);

    const { startDate, endDate, hasMessage, hasCompany, counts, interestedProducts } = customPopupState;

    const dropDownProps = {
        isMulti: true,
        selectName: "products",
        options: [
            { value: 1, label: "fasoo-drm" },
            { value: 2, label: "enterprise-drm" },
            { value: 3, label: "allinone" },
        ],
        value: interestedProducts,
        placeholder: "제품명을 검색할 수 있어요.",
        onChangeFn: (e) => setCustomPopupState((d) => ({ ...d, interestedProducts: e })),
    };

    return (
        <RadioGroup w="100%">
            <Heading size="md">#필터 기준</Heading>
            <Flex w="100%">
                <Spacer />
                <CustomDateRangePicker timeline={customPopupState} setTimeline={setCustomPopupState} onlyAllow={null} />
            </Flex>
            <Flex w="100%">
                <Heading w="40%" size="sm">
                    메시지 유/무
                </Heading>
                <Checkbox
                    w="60%"
                    size="lg"
                    value={hasMessage}
                    onChange={(e) => setCustomPopupState((d) => ({ ...d, hasMessage: e.target.checked }))}
                >
                    <Text fontSize={"sm"}>있음</Text>
                </Checkbox>
            </Flex>

            <Flex w="100%">
                <Heading w="40%" size="sm">
                    매칭 기업 유/무
                </Heading>
                <Checkbox
                    w="60%"
                    size="lg"
                    value={hasCompany}
                    onChange={(e) => setCustomPopupState((d) => ({ ...d, hasCompany: e.target.checked }))}
                >
                    <Text fontSize={"sm"}>있음</Text>
                </Checkbox>
            </Flex>

            <Flex w="100%">
                <Heading w="40%" size="sm">
                    관심 제품
                </Heading>
                <SearchableDropdown {...dropDownProps} />
            </Flex>

            <Flex w="100%">
                <Heading w="40%" size="sm">
                    최소 방문 횟수
                </Heading>
                <NumberInput
                    defaultValue={2}
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
        </RadioGroup>
    );
}
