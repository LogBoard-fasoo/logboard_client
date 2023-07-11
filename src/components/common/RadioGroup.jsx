import React from "react";
import { HStack, Heading, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

export default function CustomRadioGroup({ title, radioLst, onChange, value }) {
    return (
        <RadioGroup onChange={onChange} value={value}>
            <HStack>
                {title && <Heading size="md">{title}</Heading>}
                <Stack direction="row">
                    {radioLst.map((radio) => (
                        <Radio size="lg" key={radio.value} value={radio.value}>
                            <Text fontSize="md">{radio.option}</Text>
                        </Radio>
                    ))}
                </Stack>
            </HStack>
        </RadioGroup>
    );
}
