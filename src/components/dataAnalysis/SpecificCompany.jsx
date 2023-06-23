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
import CustomTooltip from "../common/Tooltip";
import NoResultFound from "../common/NoResultFound";

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
            <Flex my={3}>
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
                    <PieBox cname={cname} pieDataUrl={pieDataUrl} pieDataCat={pieDataCat} />
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
                <CustomTooltip
                    tooltipContent={
                        <small>
                            <strong>Tip!</strong>
                            <br />
                            <li>여러 기업을 선택할 수 있어요.</li>
                            <li>선택한 기업의 주별 방문 트렌드에요. </li>
                        </small>
                    }
                />
            </Heading>
            {data.length > 0 ? <GraphChart data={data} x={"날짜"} y={"방문횟수"} /> : <NoResultFound />}
        </Box>
    );
}

function PieBox({ cname, pieDataUrl, pieDataCat }) {
    return (
        <HStack>
            <Box style={{ width: "100%", height: "550px" }} bg="white" boxShadow="base" p="6" rounded="md">
                <Heading as="h5" fontSize="xl" mb={2}>
                    관심 제품 영역
                    <CustomTooltip
                        tooltipContent={
                            <small>
                                <strong>Tip!</strong>
                                <br />
                                <li>{cname}이 관심있는 제품 영역입니다.</li>
                                <li>services는 컨설팅, products는 제품, solutions는 솔루션을 의미합니다.</li>
                            </small>
                        }
                    />
                </Heading>
                <PieChart data={pieDataCat} />
            </Box>
            <Box style={{ width: "100%", height: "550px" }} bg="white" boxShadow="base" p="6" rounded="md">
                <Heading as="h5" fontSize="xl">
                    관심제품 Top 5
                    <CustomTooltip
                        tooltipContent={
                            <small>
                                <strong>Tip!</strong>
                                <br />
                                <li>{cname}이 관심있는 제품의 Top 10입니다.</li>
                                <li>결과 내 url은 제품의 url과 매칭됩니다.</li>
                            </small>
                        }
                    />
                </Heading>
                <PieChart data={pieDataUrl} />
            </Box>
        </HStack>
    );
}
