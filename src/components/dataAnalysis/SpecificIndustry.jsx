import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, Heading, Spacer } from "@chakra-ui/react";
import HBarChart from "../common/HBarChart";
import CustomDateRangePicker from "../common/Datepicker";
import { initialTimeline } from "../../recoil/atoms/specificIndustry";
import { useRecoilState } from "recoil";
import { getAllCategoryTypes, getAllIndsutryTypes, getAllTechnologyTypes } from "../../services/dataAnalysis/types";
import { useQuery } from "@tanstack/react-query";
import {
    getTopVisitedUrlByCategory,
    getTopVisitedUrlByIndustry,
    getTopVisitedUrlByTechnoology,
} from "../../services/dataAnalysis/visitedUrls";
import SearchableDropdown from "../common/SearchableDropdown";
import CustomTooltip from "../common/Tooltip";
import NoResultFound from "../common/NoResultFound";
import SummaryBox from "./SummaryBox";
import useSummarizeTimeline from "../../hooks/useSummarizeTimeline";
import { getTypeName, summarizeUrls } from "../utils/summarizeKeys";

export default function SpecificIndustry() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);
    const [categoryId, setCategoryId] = useState(null);
    const [industryId, setIndustryId] = useState(null);
    const [technologyId, setTechnologyId] = useState(null);
    const timelineStr = useSummarizeTimeline(initialTimeline);
    const noResultStr = "기간 선택 또는 검색어를 입력해주세요.";

    const summaryContent = {
        카테고리: categoryId
            ? `${timelineStr} 동안 ${getTypeName("categories", categoryId)} 카테고리에 속한 기업은 ${summarizeUrls(
                  "topUrlByCategory",
                  categoryId,
              )} 제품에 큰 관심을 보입니다. `
            : noResultStr,
        산업군: industryId
            ? `${timelineStr} 동안  ${getTypeName("industries", industryId)} 산업군에 속한 기업은 ${summarizeUrls(
                  "topUrlByIndustry",
              )} 제품에 큰 관심을 보였습니다. `
            : noResultStr,
        사용기술: technologyId
            ? `${timelineStr} 동안 ${getTypeName("technologies", technologyId)} 기술을 사용하는 기업은 ${summarizeUrls(
                  "topUrlByTechnology",
              )} 제품에 큰 관심을 보입니다.`
            : noResultStr,
    };

    return (
        <Box>
            <Flex my={3}>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr" }} gap={4}>
                <CategoryBox timeline={timeline} categoryId={categoryId} setCategoryId={setCategoryId} />
                <IndustryBox timeline={timeline} industryId={industryId} setIndustryId={setIndustryId} />
                <TechnologyBox timeline={timeline} technologyId={technologyId} setTechnologyId={setTechnologyId} />
            </Grid>
            <SummaryBox summaryContent={summaryContent} />
        </Box>
    );
}

function CategoryBox({ timeline, categoryId, setCategoryId }) {
    const { startDate, endDate } = timeline;

    const { data: allTypes } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategoryTypes,
        staleTime: Infinity,
    });

    const { data: ranking, refetch } = useQuery({
        enabled: categoryId ? true : false,
        queryKey: ["topUrlByCategory"],
        queryFn: () => getTopVisitedUrlByCategory(categoryId, startDate, endDate),
    });

    useEffect(() => {
        categoryId && refetch();
    }, [categoryId, startDate, endDate]);

    const prop = {
        title: "Category",
        selectName: "categories",
        placeholder: "카테고리를 검색할 수 있어요.",
        typeId: categoryId,
        options: allTypes?.data,
        onChangeFn: (e) => setCategoryId(parseInt(e?.value)),
        data: ranking?.data || [],
        tip: "선택한 카테고리에 속하는 기업은 해당 제품들에 가장 관심이 많아요.",
    };

    return <SpecificIndustryBox {...prop} />;
}

function IndustryBox({ timeline, industryId, setIndustryId }) {
    const { startDate, endDate } = timeline;

    const { data: allTypes } = useQuery({
        queryKey: ["industries"],
        queryFn: getAllIndsutryTypes,
        staleTime: Infinity,
    });

    const { data: ranking, refetch } = useQuery({
        enabled: industryId ? true : false,
        queryKey: ["topUrlByIndustry"],
        queryFn: () => getTopVisitedUrlByIndustry(industryId, startDate, endDate),
    });

    useEffect(() => {
        industryId && refetch();
    }, [industryId, startDate, endDate]);

    const prop = {
        title: "Industry",
        selectName: "industries",
        placeholder: "산업군을 검색할 수 있어요.",
        typeId: industryId,
        options: allTypes?.data,
        onChangeFn: (e) => setIndustryId(parseInt(e?.value)),
        data: ranking?.data || [],
        tip: "선택한 카테고리에 속하는 기업은 해당 제품들에 가장 관심이 많아요.",
    };

    return <SpecificIndustryBox {...prop} />;
}

function TechnologyBox({ timeline, technologyId, setTechnologyId }) {
    const { startDate, endDate } = timeline;

    const { data: allTypes } = useQuery({
        queryKey: ["technologies"],
        queryFn: getAllTechnologyTypes,
        staleTime: Infinity,
    });

    const { data: ranking, refetch } = useQuery({
        enabled: technologyId ? true : false,
        enabled: false,
        queryKey: ["topUrlByTechnology"],
        queryFn: () => getTopVisitedUrlByTechnoology(technologyId, startDate, endDate),
    });

    useEffect(() => {
        technologyId && refetch();
    }, [technologyId, startDate, endDate]);

    const prop = {
        title: "Technology",
        selectName: "technologies",
        placeholder: "사용 기술을 검색할 수 있어요.",
        typeId: technologyId,
        options: allTypes?.data || [],
        onChangeFn: (e) => setTechnologyId(e.map((tech) => tech.value).join()),
        data: ranking?.data || [],
        isMulti: true,
        tip: "선택한 카테고리에 속하는 기업은 해당 제품들에 가장 관심이 많아요.",
    };

    return <SpecificIndustryBox {...prop} />;
}

function SpecificIndustryBox({ data, title, tip, typeId, ...rest }) {
    return (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
            <Heading as="h4" fontSize="xl" mb={2}>
                {title}
                <CustomTooltip
                    tooltipContent={
                        <small>
                            <strong>Tip!</strong>
                            <br />
                            <span>{tip}</span>
                        </small>
                    }
                />
            </Heading>
            <SearchableDropdown {...rest} />
            <Box style={{ width: "100%", height: "400px" }}>
                {typeId && data.length > 0 ? <HBarChart data={data} /> : <NoResultFound />}
            </Box>
        </Box>
    );
}
