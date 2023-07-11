import React from "react";
import Sidebar from "../layout/Sidebar";
import { Box, Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { FiMessageCircle } from "react-icons/fi";
import { initialMappingState } from "../../recoil/atoms/ipMapping";
import { useRecoilState } from "recoil";
import Filter from "../customPopup/Filter";
import IpTable from "../customPopup/IpTable";
import MessageBox from "../customPopup/MessageBox";

function CustomPopup() {
    const [ipMappingState, setIpMappingState] = useRecoilState(initialMappingState);

    return (
        <Sidebar>
            <Box h="100%" p="10">
                <Flex>
                    <Heading as="h1" size="2xl" noOfLines={1} mr={3} textShadow="3px 3px 3px rgba(0,0,0,0.2)">
                        <FiMessageCircle />
                    </Heading>
                    <Heading as="h1" size="2xl" noOfLines={1} textShadow="3px 3px 3px rgba(0,0,0,0.2)" pb={3}>
                        Custom Popup
                    </Heading>
                </Flex>
                <Text fontSize={"sm"} my={2}>
                    IP 별 커스텀 팝업 메시지를 작성할 수 있는 페이지입니다.
                </Text>
                <Box bg="gray.50" borderRadius="xl" p={6} mt={5} boxShadow="base" rounded="md">
                    <HStack my={3}>
                        <Filter />
                    </HStack>
                </Box>
                <HStack h={"1000px"}>
                    <Box
                        bg="gray.50"
                        borderRadius="xl"
                        p={6}
                        mt={5}
                        boxShadow="base"
                        rounded="md"
                        w={"75%"}
                        h={"100%"}
                        overflow={"scroll"}
                    >
                        <IpTable />
                    </Box>
                    <Box bg="gray.50" borderRadius="xl" p={6} mt={5} boxShadow="base" rounded="md" w={"25%"} h={"100%"}>
                        <MessageBox />
                    </Box>
                </HStack>
            </Box>
        </Sidebar>
    );
}

export default CustomPopup;
