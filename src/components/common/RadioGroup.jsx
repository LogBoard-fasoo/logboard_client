import React from "react";
import { HStack, Heading, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

export default function CustomRadioGroup({ title, radioLst, changeFn, defaultValue, isDisabled }) {
    return (
        <RadioGroup onChange={changeFn} value={defaultValue} defaultValue={"1"}>
            <HStack>
                {title && <Heading size="md">{title}</Heading>}
                <Stack direction="row">
                    {radioLst.map((radio) => (
                        <Radio size="lg" key={radio.value} value={radio.value} isDisabled={isDisabled}>
                            <Text fontSize="md">{radio.option}</Text>
                        </Radio>
                    ))}
                </Stack>
            </HStack>
        </RadioGroup>
    );
}
