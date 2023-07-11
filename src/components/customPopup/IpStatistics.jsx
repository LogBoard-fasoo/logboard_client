import React from "react";
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    FormLabel,
    HStack,
    Heading,
    Stack,
    Td,
    Text,
    Textarea,
    Tr,
    Wrap,
} from "@chakra-ui/react";
import SmoothTransition from "../../styles/animate/SmoothTransition";
import { CustomDatePicker } from "../common/Datepicker";

const cnames = [
    {
        cname: "CJ",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
    {
        cname: "SK",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
    {
        cname: "Fasoo",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
    {
        cname: "LG",
        domain: "www.cj.com",
        employeeRange: "200k-500k",
    },
];

const IP = {
    message: "요즘 allinone 솔루션에 관심이 많으시죠?",
    validDate: "2023-07-11",
};

export default function IpStatistics({ ip }) {
    return (
        <Tr>
            <Td colSpan="5">
                <SmoothTransition>
                    <Wrap>
                        <CustomCard title="메시지">
                            <HStack>
                                {IP.message ? (
                                    <>
                                        <Textarea isDisabled={true} type="text" value={IP.message} />
                                        <CustomDatePicker value={IP.validDate} isDisabled={true} />
                                    </>
                                ) : (
                                    <Text>등록된 메시지가 없습니다.</Text>
                                )}
                            </HStack>
                        </CustomCard>
                        <CustomCard title="방문 트렌드"></CustomCard>
                        <CustomCard title="관심 제품 추세"></CustomCard>
                        <CustomCard title="트렌드 분석"></CustomCard>
                    </Wrap>
                </SmoothTransition>
            </Td>
        </Tr>
    );
}

function CustomCard({ title, children }) {
    return (
        <Box w={"100%"} bg="white" p={5} m={0}>
            <Heading size="sm"># {title}</Heading>
            <Box>{children}</Box>
        </Box>
    );
}
