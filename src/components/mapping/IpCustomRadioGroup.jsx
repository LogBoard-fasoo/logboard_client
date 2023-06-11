import React from "react";
import { initialMappingState } from "../../recoil/atoms/ipMapping";
import { useRecoilState } from "recoil";
import CustomRadioGroup from "../common/RadioGroup";
import { RadioGroup } from "@chakra-ui/react";

export default function IpCustomRadioGroup() {
    const [ipMappingState, setIpMappingState] = useRecoilState(initialMappingState);
    const { filter } = ipMappingState;
    const radioLst = [
        { value: 1, option: "High intent" },
        { value: 2, option: "방문횟수" },
    ];

    function changeFn(e) {
        setIpMappingState((s) => ({ ...s, filter: parseInt(e) }));
    }

    const prop = {
        radioLst,
        changeFn,
        defaultValue: filter,
    };

    return (
        <RadioGroup onChange={(e) => setIpMappingState((s) => ({ ...s, filter: parseInt(e) }))} value={filter}>
            <small>#핕터 기준을 선택해주세요</small>
            <CustomRadioGroup {...prop} />
        </RadioGroup>
    );
}
