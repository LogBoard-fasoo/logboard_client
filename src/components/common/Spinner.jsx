import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

export default function CustomSpinner() {
    return (
        <Flex pos="fixed" top={"50%"} left={"50%"} zIndex={10}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Flex>
    );
}
