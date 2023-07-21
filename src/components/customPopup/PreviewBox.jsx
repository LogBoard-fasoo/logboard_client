import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { initialPopupMessageState } from "../../recoil/atoms/popupMessage";

export default function PreviewBox() {
    const message = useRecoilValue(initialPopupMessageState);

    useEffect(() => {
        document.querySelector("#preview").innerHTML = message.content;
    }, [message]);
    return (
        <Box>
            <Heading size="md" noOfLines={1} pb={3}>
                # 미리보기
            </Heading>
            <Box bg={"white"} boxShadow={"base"} p={5} borderRadius={"lg"} id="preview" textAlign={"center"}></Box>
        </Box>
    );
}
