import React, { useEffect, useState } from "react";
import GraphChart from "../common/GraphChart";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Grid,
    HStack,
    Heading,
    Spacer,
} from "@chakra-ui/react";
import SearchableDropdown from "../common/SearchableDropdown";
import PieChart from "../common/PieChart";
import CustomDateRangePicker from "../common/Datepicker";
import { initialTimeline } from "../../recoil/atoms/specificCompany";
import { useRecoilState } from "recoil";
import { getAllCompanies } from "../../services/dataAnalysis/types";
import { getWeeklyTrendsByCompany } from "../../services/dataAnalysis/visitors";
import { getTop5UrlOfCompany, getTopCategoryOfCompany } from "../../services/dataAnalysis/companies";

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
                y: 210,
            },
            {
                x: "4/28",
                y: 26,
            },
            {
                x: "4/28",
                y: 26,
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
                y: 600,
            },
            {
                x: "4/14",
                y: 30,
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
];

export default function SpecificCompany() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);
    const { startDate, endDate } = timeline;
    const [allCompanies, setAllCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [companyTrends, setCompanyTrends] = useState([]);

    useEffect(() => {
        getAllCompanies().then((res) => setAllCompanies(res.data));
    }, []);

    useEffect(() => {
        selectedCompanies.length > 0 &&
            getWeeklyTrendsByCompany(selectedCompanies, startDate, endDate).then((res) => setCompanyTrends(res.data));
    }, [selectedCompanies, startDate, endDate]);

    const dropDownProps = {
        isMulti: true,
        selectName: "companies",
        options: allCompanies,
        placeholder: "기업을 검색할 수 있어요.",
        onChangeFn: (e) => setSelectedCompanies(e),
    };

    return (
        <Box>
            <Flex>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <Grid templateColumns={{ base: "1fr" }} gap={4}>
                <SearchableDropdown {...dropDownProps} />
                <GraphBox data={companyTrends} />
                {selectedCompanies.map((c) => (
                    <CompanyPieBox key={c.label} cId={c.value} cname={c.label} timeline={timeline} />
                ))}
            </Grid>
        </Box>
    );
}

function CompanyPieBox({ cId, cname, timeline }) {
    const { startDate, endDate } = timeline;
    const [pieDataUrl, setPieDataUrl] = useState([]);
    const [pieDataCat, setPieDataCat] = useState([]);

    useEffect(() => {
        getTop5UrlOfCompany(cId, startDate, endDate).then((res) => setPieDataUrl(res.data));
    }, [startDate, endDate]);

    useEffect(() => {
        getTopCategoryOfCompany(cId, startDate, endDate).then((res) => setPieDataCat(res.data));
    }, [startDate, endDate]);

    return (
        <Accordion allowMultiple>
            <AccordionItem>
                <h2>
                    <AccordionButton px={0}>
                        <Box as="span" flex="1" textAlign="left">
                            <Heading fontSize={"xl"}># {cname}&apos;s report</Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel px={0}>
                    <PieBox pieDataUrl={pieDataUrl} pieDataCat={pieDataCat} />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

function GraphBox({ data }) {
    return (
        <Box style={{ width: "100%", height: "500px" }} bg="white" boxShadow="base" p="6" rounded="md">
            <Heading as="h5" fontSize="xl">
                주별 방문 트렌드
            </Heading>
            <GraphChart data={data} />
        </Box>
    );
}

function PieBox({ pieDataUrl, pieDataCat }) {
    return (
        <HStack>
            <Box style={{ width: "100%", height: "500px" }} bg="white" boxShadow="base" p="6" rounded="md">
                <Heading as="h5" fontSize="xl">
                    관심 제품군
                </Heading>
                <PieChart data={pieDataCat} />
            </Box>
            <Box style={{ width: "100%", height: "500px" }} bg="white" boxShadow="base" p="6" rounded="md">
                <Heading as="h5" fontSize="xl">
                    관심제품 Top 5
                </Heading>
                <PieChart data={pieDataUrl} />
            </Box>
        </HStack>
    );
}
