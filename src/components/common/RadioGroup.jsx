import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export default function CustomRadioGroup({ radioLst, changeFn, defaultValue, isDisabled }) {
    return (
        <RadioGroup onChange={changeFn} value={defaultValue} defaultValue={"1"}>
            <Stack direction="row">
                {radioLst.map((radio) => (
                    <Radio size="lg" key={radio.value} value={radio.value} isDisabled={isDisabled}>
                        {radio.option}
                    </Radio>
                ))}
            </Stack>
        </RadioGroup>
    );
}
