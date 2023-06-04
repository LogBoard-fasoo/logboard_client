import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Card,
    CardBody,
    Heading,
    Stack,
    StackDivider,
    Text,
} from "@chakra-ui/react";
import React from "react";

export default function SummaryBox() {
    return (
        <Accordion defaultIndex={[0]} allowMultiple mt={2}>
            <AccordionItem>
                <AccordionButton px={0}>
                    <Box flex="1" textAlign="left">
                        <Heading size="md">Summary</Heading>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={0}>
                    <Card>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                                <Box>
                                    <Heading size="xs" textTransform="uppercase">
                                        Summary
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                        View a summary of all your clients over the last month.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size="xs" textTransform="uppercase">
                                        Overview
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                        Check out the overview of your clients.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size="xs" textTransform="uppercase">
                                        Analysis
                                    </Heading>
                                    <Text pt="2" fontSize="sm">
                                        See a detailed analysis of all your business clients.
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
