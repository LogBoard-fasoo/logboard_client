import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { Images } from "../../assets/images";

export default function NoResultFound() {
    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" w="100%" h="90%">
            <Image src={Images.NoResult} alt="No result" mb={2} w="50%" maxW={"400px"} />
            <Text>검색 결과가 존재하지 않아요.</Text>
            <Text fontSize="xs">다른 기간 또는 필터를 선택해주세요.</Text>
        </Flex>
    );
}
