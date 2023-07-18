import { Box, Flex, FormControl, FormLabel, Heading, Spacer, Spinner, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CustomDatePicker } from "../common/Datepicker";
import SubmimtBtn from "../common/SubmitBtn";
import useReconfirmDialog from "../../hooks/useReconfirmDialog";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { initialPopupMessageState } from "../../recoil/atoms/popupMessage";
import filteredIPsSelector from "../../recoil/selectors/ipsToFetchMsg";
import { useQuery } from "@tanstack/react-query";
import { updateMessage } from "../../services/customPopup/ipMessage";
import { initialPopupIpState } from "../../recoil/atoms/popupIpSetting";

export default function MessageBox() {
    const [message, setMessage] = useRecoilState(initialPopupMessageState);
    const [ipList, setIpList] = useRecoilState(initialPopupIpState);
    const resetMessage = useResetRecoilState(initialPopupMessageState);

    const { ips, content, validDate, url } = message;
    const selectedIps = useRecoilValue(filteredIPsSelector);
    const [isChanged, setIsChanged] = useState(false);

    const { data: allIps, refetch: refetchIps } = useQuery({
        queryKey: ["getFilteredIps"],
        queryFn: () => getFilteredIps(hasMessage, hasCompany, interestedProducts, counts, startDate, endDate),
        onSuccess: async () => {
            setIpList((d) => allIps?.data);
        },
    });

    const { data, refetch } = useQuery({
        enabled: false,
        queryKey: ["updateMessage"],
        queryFn: async () => {
            let ips = "";
            for (const ip of ipList) {
                if (ip.apply) {
                    ips += ip.ip;
                }
            }
            await updateMessage(ips, content, validDate.split(" ")[0], url);
            await resetMessage();
            await refetchIps();
            await setIpList((ipList) => {
                const ipListCp = [...ipList];
                for (const ip of ipListCp) {
                    ip.apply = false;
                }
                return ipListCp;
            });
        },
    });

    const [onOpen, ReconfirmDialog] = useReconfirmDialog(
        "해당 메시지를 적용하시겠습니까?",
        "해당 변경 사항은 즉시 유저에게 반영됩니다.",
        () => {
            refetch();
            setIpList((prev) => {
                return prev.map((obj) => ({ ...obj, apply: false }));
            });
        },
    );

    useEffect(() => {
        if (message.content && message.validDate && message.url && selectedIps.length > 0) setIsChanged(true);
        else setIsChanged(false);
    }, [message, selectedIps]);

    return (
        <Box>
            <Heading size="md" noOfLines={1} pb={3}>
                # Message Box
            </Heading>
            <FormControl>
                <FormLabel>콘텐츠</FormLabel>
                <Textarea
                    type="text"
                    value={message?.content.replaceAll("<span>", "").replaceAll("</span>", "")}
                    placeholder="팝업 메시지 콘텐츠.&#13;&#10; 강조하려는 단어에 <strong></strong> 태그를, 줄바꿈은 <br/> 태그 입력. &#13;&#10;  e.g. 요즈음 <br/> <strong>DRM 제품에</strong> 관심이 많으시죠?"
                    rows={10}
                    onChange={(e) => setMessage((d) => ({ ...d, content: e.target.value }))}
                />
                <Textarea
                    type="text"
                    value={message?.url}
                    placeholder="띄워줄 url 주소를 입력해주세요."
                    rows={2}
                    my={2}
                    onChange={(e) => setMessage((d) => ({ ...d, url: e.target.value }))}
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
