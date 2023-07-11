import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Spacer, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { CustomDatePicker } from "../common/Datepicker";
import SubmimtBtn from "../common/SubmitBtn";
import useReconfirmDialog from "../../hooks/useReconfirmDialog";

export default function MessageBox() {
    const [onOpen, ReconfirmDialog] = useReconfirmDialog(
        "해당 메시지를 적용하시겠습니까?",
        "해당 변경 사항은 유저에게 즉시 반영됩니다.",
        () => console.log("저장되었습니다"),
    );

    return (
        <Box>
            <Heading size="sm" noOfLines={1} pb={3}>
                Message Box
            </Heading>
            <FormControl>
                <FormLabel>컨텐츠</FormLabel>
                <Textarea
                    type="text"
                    placeholder="팝업 메시지 컨텐츠. url은 다음 형식으로 추가할 수 있습니다.
                    &#13;&#10;
                    e.g. 요즈음 [Data Security Platform](https://www.fasoo.com/solutions/fasoo-data-security-platform) 제품에 관심이 많으시죠?"
                    rows={10}
                />
                <FormLabel>유효일자</FormLabel>
                <CustomDatePicker />
                <Flex>
                    <Spacer />
                    <SubmimtBtn onClick={onOpen}>저장</SubmimtBtn>
                </Flex>
                <ReconfirmDialog />
            </FormControl>
        </Box>
    );
}
