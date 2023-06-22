import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Card,
    CardBody,
    HStack,
    Heading,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function SummaryBox({ summaryContent }) {
    return (
        // 디폴트로 open한 상태를 원한다면 defaultIndex={[0]} 속성 추가
        <Accordion allowMultiple mt={2} defaultIndex={[0]}>
            <AccordionItem>
                <AccordionButton px={0}>
                    <Box flex="1" textAlign="left">
                        <Heading size="md">Summary</Heading>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel px={0}>
                    <Card>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                                {Object.keys(summaryContent).map((k) => (
                                    <Box key={Math.random().toString() + k}>
                                        <Heading size="xs" textTransform="uppercase">
                                            {k}
                                        </Heading>
                                        <HStack alignItems={"center"} pt={2}>
                                            <FiCheckCircle color="green" size={15} width={"5%"} />
                                            <Text fontSize="sm" width={"90%"}>
                                                {summaryContent[k]}
                                            </Text>
                                        </HStack>
                                    </Box>
                                ))}
                            </Stack>
                        </CardBody>
                    </Card>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
