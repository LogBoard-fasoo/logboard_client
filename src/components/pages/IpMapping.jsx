import React from "react";
import Sidebar from "../layout/Sidebar";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { FiMessageCircle } from "react-icons/fi";
import IpMappingTable from "../mapping/IpMappingTable";

function Mapping() {
    return (
        <Sidebar>
            <Box h="100%" p="10">
                <Flex>
                    <Heading as="h1" size="2xl" noOfLines={1} mr={3} textShadow="3px 3px 3px rgba(0,0,0,0.2)">
                        <FiMessageCircle />
                    </Heading>
                    <Heading as="h1" size="2xl" noOfLines={1} textShadow="3px 3px 3px rgba(0,0,0,0.2)">
                        IP Mapping
                    </Heading>
                </Flex>
                <small>IP별 커스텀 팝업 메시지를 작성할 수 있는 페이지입니다.</small>
                <Box bg="gray.50" borderRadius="xl" p={6} boxShadow="base" rounded="md">
                    <IpMappingTable />
                </Box>
            </Box>
        </Sidebar>
    );
}

export default Mapping;
