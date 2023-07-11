import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Spacer, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CustomDatePicker } from "../common/Datepicker";
import SubmimtBtn from "../common/SubmitBtn";
import useReconfirmDialog from "../../hooks/useReconfirmDialog";
import { useRecoilState, useRecoilValue } from "recoil";
import { initialPopupMessageState } from "../../recoil/atoms/popupMessage";
import filteredIPsSelector from "../../recoil/selectors/ipsToFetchMsg";

export default function MessageBox() {
    const [message, setMessage] = useRecoilState(initialPopupMessageState);
    const selectedIps = useRecoilValue(filteredIPsSelector);
    const [isChanged, setIsChanged] = useState(false);

    const [onOpen, ReconfirmDialog] = useReconfirmDialog(
        "해당 메시지를 적용하시겠습니까?",
        "해당 변경 사항은 즉시 유저에게 반영됩니다.",
        () => console.log("저장되었습니다"),
    );

    useEffect(() => {
        if (message.content && message.validDate && selectedIps.length > 0) setIsChanged(true);
        else setIsChanged(false);
    }, [message, selectedIps]);

    return (
        <Box>
            <Heading size="md" noOfLines={1} pb={3}>
                Message Box
            </Heading>
            <FormControl>
                <FormLabel>컨텐츠</FormLabel>
                <Textarea
                    type="text"
                    value={message?.content}
                    placeholder="팝업 메시지 컨텐츠.&#13;&#10;url 추가 방식: &#13;&#10;e.g.요즈음 [Data Security Platform](https://www.fasoo.com/solutions/fasoo-data-security-platform) 제품에 관심이 많으시죠?"
                    rows={10}
                    onChange={(e) => setMessage((d) => ({ ...d, content: e.target.value }))}
                />
                <Flex>
                    <Spacer />
                    <CustomDatePicker
                        value={message?.validDate}
                        onChange={(e) => setMessage((d) => ({ ...d, validDate: `${e?.$y}-${e?.$M + 1}-${e?.$D}` }))}
                    />
                </Flex>
                <Flex>
                    <Spacer />
                    <SubmimtBtn onClick={onOpen} disabled={!isChanged}>
                        저장
                    </SubmimtBtn>
                </Flex>
                <ReconfirmDialog />
            </FormControl>
        </Box>
    );
}
