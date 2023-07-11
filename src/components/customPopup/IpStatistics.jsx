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
import PieChart from "../common/PieChart";
import GraphChart from "../common/GraphChart";

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

const data = [
    {
        id: "elixir",
        value: 51,
    },
    {
        id: "java",
        value: 264,
    },
    {
        id: "php",
        value: 112,
    },
    {
        id: "haskell",
        value: 534,
    },
    {
        id: "c",
        value: 526,
    },
];

const data1 = [
    {
        id: "파수",
        data: [
            {
                x: "4/7",
                y: 284,
            },
            {
                x: "4/14",
                y: 243,
            },
            {
                x: "4/21",
                y: 222,
            },
            {
                x: "4/21",
                y: 210,
            },
            {
                x: "4/28",
                y: 35,
            },
            {
                x: "4/28",
                y: 20,
            },
            {
                x: "4/28",
                y: 26,
            },
        ],
    },
    {
        id: "스패로우",
        data: [
            {
                x: "4/7",
                y: 22,
            },
            {
                x: "4/14",
                y: 45,
            },
            {
                x: "4/21",
                y: 3,
            },
            {
                x: "4/21",
                y: 210,
            },
            {
                x: "4/28",
                y: 35,
            },
            {
                x: "4/28",
                y: 30,
            },
            {
                x: "4/28",
                y: 86,
            },
        ],
    },
];
export const MESSAGE = {
    content: "요즈음 [DRM](www.fasoo.com) 제품에 관심이 많으시죠?",
    validDate: "2023-07-10",
};

export default function IpStatistics({ ip }) {
    return (
        <Tr>
            <Td colSpan="5">
                <SmoothTransition>
                    <Wrap>
                        <CustomCard title="메시지">
                            <Stack>
                                {MESSAGE.content ? (
                                    <>
                                        <Textarea isDisabled={true} type="text" value={MESSAGE.content} />
                                        <CustomDatePicker value={MESSAGE.validDate} isDisabled={true} />
                                    </>
                                ) : (
                                    <Text>등록된 메시지가 없습니다.</Text>
                                )}
                            </Stack>
                        </CustomCard>

                        <CustomCard title="관심 제품">
                            <HStack>
                                <Box style={{ width: "100%", height: "550px" }}>
                                    <Heading size="xs">관심도</Heading>
                                    <PieChart data={data} />
                                </Box>
                                <Box style={{ width: "100%", height: "550px" }}>
                                    <Heading size="xs">방문횟수</Heading>
                                    <PieChart data={data} />
                                </Box>
                            </HStack>
                        </CustomCard>
                        <CustomCard title="제품 관심 추세">
                            <Box style={{ width: "100%", height: "400px" }}>
                                <GraphChart data={data1} x={"날짜"} y={"방문횟수"} />
                            </Box>
                        </CustomCard>
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
