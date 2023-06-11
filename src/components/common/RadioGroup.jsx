import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export default function CustomRadioGroup({ radioLst, changeFn, defaultValue }) {
    return (
        <RadioGroup onChange={changeFn} value={defaultValue}>
            <Stack direction="row">
                {radioLst.map((radio) => (
                    <Radio size="lg" key={radio.value} value={radio.value}>
                        {radio.option}
                    </Radio>
                ))}
            </Stack>
        </RadioGroup>
    );
}
