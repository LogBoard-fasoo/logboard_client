import React from "react";
import Sidebar from "../layout/Sidebar";
import { Box, Icon, Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { FiHash, FiActivity } from "react-icons/fi";
import CustomTooltip from "../common/Tooltip";
import CustomDateRangePicker from "../common/Datepicker";
import GeneralIndustry from "../dataAnalysis/GeneralIndustry";
import SpecificIndustry from "../dataAnalysis/SpecificIndustry";
import TopCompanies from "../dataAnalysis/TopCompanies";
import SpecificCompany from "../dataAnalysis/SpecificCompany";
import SpecificProduct from "../dataAnalysis/SpecificProduct";
import SummaryBox from "../dataAnalysis/SummaryBox";

export default function DataAnalysis() {
    const containerProps = [
        { title: "산업 분석", tooltipContent: "산업분석임다", children: <GeneralIndustry /> },
        { title: "개별 산업 분석", tooltipContent: "산업분석임다", children: <SpecificIndustry /> },
        { title: "상위 관심 기업", tooltipContent: "산업분석임다", children: <TopCompanies /> },
        { title: "개별 기업 분석", tooltipContent: "산업분석임다", children: <SpecificCompany /> },
        { title: "개별 제품 분석", tooltipContent: "산업분석임다", children: <SpecificProduct /> },
    ];
    return (
        <Sidebar>
            <Box h="100%" p="10">
                <Box>
                    <Heading as="h1" size="2xl" noOfLines={1} textShadow="3px 3px 3px rgba(0,0,0,0.2)">
                        <FiActivity />
                        Data Analysis
                    </Heading>
                    <small>Fasoo.com 방문 기업 분석 대쉬보드입니다.</small>
                </Box>
                <CustomDateRangePicker />
                <Stack>
                    {containerProps.map(({ children, ...rest }, idx) => (
                        <Container key={idx} {...rest} titleIcon={FiHash}>
                            {children}
                        </Container>
                    ))}
                </Stack>
            </Box>
        </Sidebar>
    );
}

function Container({ title, titleIcon, children, tooltipContent }) {
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
                <CustomTooltip tooltipContent={tooltipContent} />
            </Heading>
            {children}
            <SummaryBox />
        </Box>
    );
}
