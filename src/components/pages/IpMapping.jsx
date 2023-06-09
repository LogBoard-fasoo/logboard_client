import React from "react";
import Sidebar from "../layout/Sidebar";
import { Box, Heading } from "@chakra-ui/react";
import { FiMessageCircle } from "react-icons/fi";

function Mapping() {
    return (
        <Sidebar>
            <Box h="100%" p="10">
                <Box>
                    <Heading as="h1" size="2xl" noOfLines={1} textShadow="3px 3px 3px rgba(0,0,0,0.2)">
                        <FiMessageCircle />
                        IP Mapping
                    </Heading>
                </Box>
                <Box bg="gray.50" borderRadius="xl" p={6} boxShadow="base" rounded="md">
                    Hola
                </Box>
            </Box>
        </Sidebar>
    );
}

export default Mapping;
