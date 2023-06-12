import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, Image, Spacer, Text } from "@chakra-ui/react";
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
import { formatDate } from "../utils/formatDate";
import { Images } from "../../assets/images";
import SearchableDropdown from "../common/SearchableDropdown";

// const _data = [
//     {
//         url: "AD",
//         count: 4,
//     },
//     {
//         url: "AE",
//         count: 2,
//     },
//     {
//         url: "AG",
//         count: 10,
//     },
//     {
//         url: "AI",
//         count: 5,
//     },
//     {
//         url: "AL",
//         count: 8,
//     },
//     {
//         url: "AM",
//         count: 9,
//     },
// ];

export default function SpecificIndustry() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);

    return (
        <Box>
            <Flex>
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

function SpecificIndustryBox({ data, ...rest }) {
    return (
        <Box boxShadow="base" p="6" rounded="md" bg="white">
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

function CategoryBox(timeline) {
    const [typeId, settypeId] = useState(null);
    const [data, setdata] = useState([]);
    const { startDate, endDate } = timeline.timeline;

    const allTypes = useQuery({ queryKey: ["categories"], queryFn: getAllCategoryTypes, staleTime: Infinity });

    useEffect(() => {
        getTopVisitedUrlByCategory(typeId, formatDate(startDate), formatDate(endDate)).then((res) => setdata(res.data));
    }, [typeId, startDate, endDate]);

    const prop = {
        selectName: "categories",
        placeholder: "카테고리를 검색할 수 있어요.",
        options: allTypes.data?.data,
        onChangeFn: (e) => settypeId(parseInt(e.target.value)),
        data: data,
    };

    return <SpecificIndustryBox {...prop} />;
}

function IndustryBox(timeline) {
    const [typeId, settypeId] = useState(null);
    const [data, setdata] = useState([]);
    const { startDate, endDate } = timeline.timeline;

    const allTypes = useQuery({ queryKey: ["industry"], queryFn: getAllIndsutryTypes, staleTime: Infinity });

    useEffect(() => {
        getTopVisitedUrlByIndustry(typeId, formatDate(startDate), formatDate(endDate)).then((res) => setdata(res.data));
    }, [typeId, startDate, endDate]);

    const prop = {
        selectName: "industries",
        placeholder: "산업군을 검색할 수 있어요.",
        options: allTypes.data?.data,
        onChangeFn: (e) => settypeId(parseInt(e.target.value)),
        data: data,
    };

    return <SpecificIndustryBox {...prop} />;
}

function TechnologyBox(timeline) {
    const [typeId, settypeId] = useState(null);
    const [data, setdata] = useState([]);
    const { startDate, endDate } = timeline.timeline;

    const allTypes = useQuery({ queryKey: ["technology"], queryFn: getAllTechnologyTypes, staleTime: Infinity });

    useEffect(() => {
        getTopVisitedUrlByTechnoology([1, 2], formatDate(startDate), formatDate(endDate)).then((res) =>
            setdata(res.data),
        ); // TODO
    }, [typeId, startDate, endDate]);

    const prop = {
        selectName: "technologies",
        placeholder: "사용 기술을 검색할 수 있어요.",
        options: allTypes.data?.data,
        onChangeFn: (e) => settypeId(parseInt(e.target.value)),
        data: data,
    };

    return <SpecificIndustryBox {...prop} />;
}
