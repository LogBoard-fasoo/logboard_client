import React from "react";
import { Heading, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

export default function CustomRadioGroup({ title, radioLst, changeFn, defaultValue, isDisabled }) {
    return (
        <RadioGroup onChange={changeFn} value={defaultValue} defaultValue={"1"}>
            <Stack>
                {title && <Heading size="sm"># {title}</Heading>}
                <Stack direction="row">
                    {radioLst.map((radio) => (
                        <Radio size="lg" key={radio.value} value={radio.value} isDisabled={isDisabled}>
                            <Text fontSize="sm">{radio.option}</Text>
                        </Radio>
                    ))}
                </Stack>
            </Stack>
        </RadioGroup>
    );
}
