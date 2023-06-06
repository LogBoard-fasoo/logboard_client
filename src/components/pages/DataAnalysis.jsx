import React from "react";
import Sidebar from "../layout/Sidebar";
import { Box, Button, Flex, Icon, Spacer, Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { FiHash, FiActivity } from "react-icons/fi";
import GeneralIndustry from "../dataAnalysis/GeneralIndustry";
import SpecificIndustry from "../dataAnalysis/SpecificIndustry";
import TopCompanies from "../dataAnalysis/TopCompanies";
import SpecificCompany from "../dataAnalysis/SpecificCompany";
import SpecificProduct from "../dataAnalysis/SpecificProduct";
import SummaryBox from "../dataAnalysis/SummaryBox";
import CustomDateRangePicker from "../common/Datepicker";

export default function DataAnalysis() {
    const containerProps = [
        {
            title: "산업 동향",
            desc: "선택된 기간 내 Fasoo에 가장 큰 관심을 보이는 기업 카테고리와 산업, 그 기업이 많이 사용하는 기술을 뽑아봤어요.",
            children: <GeneralIndustry />,
        },
        {
            title: "개별 산업 분석",
            desc: "선택된 기간 내 기업의 카테고리, 산업, 자주 사용하는 기술 별로 관심있는 제품을 확인할 수 있어요.",
            children: <SpecificIndustry />,
        },
        {
            title: "상위 관심 기업",
            desc: "선택된 기간 내 파수에 가장 많이 방문한 기업 상위 Top 30을 볼 수 있어요.",
            children: <TopCompanies />,
        },
        {
            title: "개별 기업 분석",
            desc: "선택된 기간 내 궁금한 여러 기업의 방문 트렌드를 볼 수 있어요.", // TODO: 관심도 측정을 단순 카운팅 -> 재방문율인 경우 더 많은 가중치를 주는 방식으로 변경 가능
            children: <SpecificCompany />,
        },
        {
            title: "개별 제품 분석",
            desc: "선택된 기간 내 제품의 관심도 동향을 볼 수 있어요.",
            children: <SpecificProduct />,
        },
    ];
    return (
        <Sidebar>
            <Box h="100%" p="10">
                <Box>
                    <Heading as="h1" size="2xl" noOfLines={1} textShadow="3px 3px 3px rgba(0,0,0,0.2)">
                        <FiActivity />
                        Data Analysis
                    </Heading>
                    <Flex>
                        <small>Fasoo.com 방문 기업 분석 대쉬보드입니다.</small>
                        <Spacer />
                        <Button bg="blue.600" color="white" as="a">
                            PDF로 다운로드
                        </Button>
                    </Flex>
                </Box>
                <Stack>
                    {containerProps.map(({ children, desc, ...rest }, idx) => (
                        <Container key={idx} {...rest} titleIcon={FiHash}>
                            <Flex>
                                <small>{desc}</small>
                                <Spacer />
                                <CustomDateRangePicker />
                            </Flex>
                            {children}
                        </Container>
                    ))}
                </Stack>
            </Box>
        </Sidebar>
    );
}

function Container({ title, titleIcon, children }) {
    return (
        <Box bg="gray.50" borderRadius="xl" p={6} boxShadow="base" rounded="md">
            <Heading as="h2" size="lg">
                <Icon
                    boxSize={5}
                    mr={2}
                    _groupHover={{
                        color: "white",
                    }}
                    as={titleIcon}
                />
                {title}
            </Heading>
            {children}
            <SummaryBox />
        </Box>
    );
}
