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
import useSummaryContent from "../../hooks/useSummaryContent";

export default function SpecificIndustry() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);
    const { startDate, endDate } = timeline;
    const [categoryId, setCategoryId] = useState(null);
    const [industryId, setIndustryId] = useState(null);
    const [technologyId, setTechnologyId] = useState(null);

    const [summaryContent, setSummaryContent] = useSummaryContent(
        startDate,
        endDate,
        categoryId,
        industryId,
        technologyId,
    );

    return (
        <Box>
            <Flex my={3}>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr" }} gap={4}>
                <CategoryBox
                    timeline={timeline}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    setSummaryContent={setSummaryContent}
                />
                <IndustryBox
                    timeline={timeline}
                    industryId={industryId}
                    setIndustryId={setIndustryId}
                    setSummaryContent={setSummaryContent}
                />
                <TechnologyBox
                    timeline={timeline}
                    technologyId={technologyId}
                    setTechnologyId={setTechnologyId}
                    setSummaryContent={setSummaryContent}
                />
            </Grid>
            <SummaryBox summaryContent={summaryContent} />
        </Box>
    );
}

function CategoryBox({ timeline, categoryId, setCategoryId, setSummaryContent }) {
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
        setSummaryContent((d) => ({ ...d, categoryId }));
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

function IndustryBox({ timeline, industryId, setIndustryId, setSummaryContent }) {
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
        setSummaryContent((d) => ({ ...d, industryId }));
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

function TechnologyBox({ timeline, technologyId, setTechnologyId, setSummaryContent }) {
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
        setSummaryContent((d) => ({ ...d, technologyId }));
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
