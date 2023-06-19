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
import { FiCheck } from "react-icons/fi";

export default function SummaryBox({ summaryContent }) {
    return (
        summaryContent && ( // TODO: && 조건문 삭제
            <Accordion defaultIndex={[0]} allowMultiple mt={2}>
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
                                                <FiCheck />
                                                <Text fontSize="sm">{summaryContent[k]}</Text>
                                            </HStack>
                                        </Box>
                                    ))}
                                </Stack>
                            </CardBody>
                        </Card>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        )
    );
}
