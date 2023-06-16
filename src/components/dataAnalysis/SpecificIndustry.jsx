import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, Heading, Image, Spacer, Text } from "@chakra-ui/react";
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
import { Images } from "../../assets/images";
import SearchableDropdown from "../common/SearchableDropdown";

export default function SpecificIndustry() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);

    return (
        <Box>
            <Flex my={3}>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr 1fr" }} gap={4}>
                <CategoryBox timeline={timeline} />
                <IndustryBox timeline={timeline} />
                <TechnologyBox timeline={timeline} />
            </Grid>
        </Box>
    );
}

function CategoryBox(timeline) {
    const [typeId, settypeId] = useState(null);
    const { startDate, endDate } = timeline.timeline;

    const { data: allTypes } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategoryTypes,
        staleTime: Infinity,
    });

    const { data: ranking, refetch } = useQuery({
        enabled: typeId ? true : false,
        queryKey: ["topUrlByCategory"],
        queryFn: () => getTopVisitedUrlByCategory(typeId, startDate, endDate),
    });

    useEffect(() => {
        refetch();
    }, [typeId, startDate, endDate]);

    const prop = {
        title: "Category",
        selectName: "categories",
        placeholder: "카테고리를 검색할 수 있어요.",
        options: allTypes?.data,
        onChangeFn: (e) => settypeId(parseInt(e?.value)),
        data: ranking?.data || [],
    };

    return <SpecificIndustryBox {...prop} />;
}

function IndustryBox(timeline) {
    const [typeId, settypeId] = useState(null);
    const { startDate, endDate } = timeline.timeline;

    const { data: allTypes } = useQuery({
        queryKey: ["industries"],
        queryFn: getAllIndsutryTypes,
        staleTime: Infinity,
    });

    const { data: ranking, refetch } = useQuery({
        enabled: typeId ? true : false,
        queryKey: ["topUrlByIndustry"],
        queryFn: () => getTopVisitedUrlByIndustry(typeId, startDate, endDate),
    });

    useEffect(() => {
        refetch();
    }, [typeId, startDate, endDate]);

    const prop = {
        title: "Industry",
        selectName: "industries",
        placeholder: "산업군을 검색할 수 있어요.",
        options: allTypes?.data,
        onChangeFn: (e) => settypeId(parseInt(e?.value)),
        data: ranking?.data || [],
    };

    return <SpecificIndustryBox {...prop} />;
}

function TechnologyBox(timeline) {
    const [typeId, settypeId] = useState(null);
    const { startDate, endDate } = timeline.timeline;

    const { data: allTypes } = useQuery({
        queryKey: ["industries"],
        queryFn: getAllCategoryTypes,
        staleTime: Infinity,
    });

    const { data: ranking, refetch } = useQuery({
        enabled: typeId ? true : false,
        queryKey: ["topUrlByTechnology"],
        queryFn: () => getTopVisitedUrlByTechnoology(typeId, startDate, endDate),
    });

    useEffect(() => {
        refetch();
    }, [typeId, startDate, endDate]);

    const prop = {
        title: "Technology",
        selectName: "technologies",
        placeholder: "사용 기술을 검색할 수 있어요.",
        options: allTypes?.data || [],
        onChangeFn: (e) => settypeId(e.map((tech) => tech.value).join()),
        data: ranking?.data || [],
        isMulti: true,
    };

    return <SpecificIndustryBox {...prop} />;
}

function SpecificIndustryBox({ data, title, ...rest }) {
    return (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
            <Heading as="h4" fontSize="xl" mb={2}>
                {title}
            </Heading>
            <SearchableDropdown {...rest} />
            <Box style={{ width: "100%", height: "400px" }}>
                {data.length > 0 ? (
                    <HBarChart data={data} />
                ) : (
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" w="100%" h="100%">
                        <Image src={Images.NoResult} alt="No result" mb={2} w="50%" />
                        <Text>검색 결과가 존재하지 않아요.</Text>
                        <Text fontSize="xs">다른 기간 또는 필터를 선택해주세요.</Text>
                    </Flex>
                )}
            </Box>
        </Box>
    );
}
