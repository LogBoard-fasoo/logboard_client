import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { initialMappingState } from "../../recoil/atoms/ipMapping";
import { useRecoilState } from "recoil";

export default function CustomRadioGroup() {
    const [ipMappingState, setIpMappingState] = useRecoilState(initialMappingState);
    const { filter } = ipMappingState;

    return (
        <RadioGroup onChange={(e) => setIpMappingState((s) => ({ ...s, filter: parseInt(e) }))} value={filter}>
            <small>#핕터 기준을 선택해주세요</small>
            <Stack direction="row">
                <Radio size="lg" value={1}>
                    High intent
                </Radio>
                <Radio size="lg" value={2}>
                    방문횟수
                </Radio>
            </Stack>
        </RadioGroup>
    );
}
