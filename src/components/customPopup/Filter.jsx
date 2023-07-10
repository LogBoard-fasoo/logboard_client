import React from "react";
import { useRecoilState } from "recoil";
import { Checkbox, Flex, Heading, RadioGroup, Spacer } from "@chakra-ui/react";
import CustomDateRangePicker from "../common/Datepicker";
import SearchableDropdown from "../common/SearchableDropdown";
import { initialCustomPopupState } from "../../recoil/customPopup";

export default function Filter() {
    const [customPopupState, setCustomPopupState] = useRecoilState(initialCustomPopupState);
    const { startDate, endDate, hasMessage, hasCompany, interestedProducts } = customPopupState;

    const dropDownProps = {
        isMulti: true,
        selectName: "products",
        options: [
            { value: 1, label: "fasoo-drm" },
            { value: 2, label: "enterprise-drm" },
            { value: 3, label: "allinone" },
        ],
        placeholder: "제품명을 검색할 수 있어요.",
        onChangeFn: (e) => setCustomPopupState((d) => ({ ...d, interestedProducts: e })),
    };

    console.log("**", customPopupState);

    return (
        <RadioGroup w="100%">
            <Heading size="lg">#필터 기준</Heading>
            <Flex w="100%">
                <Spacer />
                <CustomDateRangePicker timeline={customPopupState} setTimeline={setCustomPopupState} onlyAllow={null} />
            </Flex>
            <Flex w="100%">
                <Heading w="40%" size="md">
                    메시지 유무
                </Heading>
                <Checkbox
                    w="60%"
                    size="lg"
                    value={hasMessage}
                    onChange={(e) => setCustomPopupState((d) => ({ ...d, hasMessage: e.target.checked }))}
                >
                    있음
                </Checkbox>
            </Flex>

            <Flex w="100%">
                <Heading w="40%" size="md">
                    매칭 기업 유무
                </Heading>
                <Checkbox
                    w="60%"
                    size="lg"
                    value={hasCompany}
                    onChange={(e) => setCustomPopupState((d) => ({ ...d, hasCompany: e.target.checked }))}
                >
                    있음
                </Checkbox>
            </Flex>

            <Flex w="100%">
                <Heading w="40%" size="md">
                    관심 제품
                </Heading>
                <SearchableDropdown {...dropDownProps} />
            </Flex>
        </RadioGroup>
    );
}
