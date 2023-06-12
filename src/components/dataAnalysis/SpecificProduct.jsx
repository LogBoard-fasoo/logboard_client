import React, { useEffect, useState } from "react";
import GraphChart from "../common/GraphChart";
import { Box, Flex, Grid, Spacer } from "@chakra-ui/react";
import CustomDateRangePicker from "../common/Datepicker";
import { initialTimeline } from "../../recoil/atoms/specificProduct";
import { useRecoilState } from "recoil";
import SearchableDropdown from "../common/SearchableDropdown";
import { getAllUrls } from "../../services/dataAnalysis/types";

const data = [
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

export default function SpecificProduct() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState(null);

    useEffect(() => {
        getAllUrls().then((res) => setAllProducts(res.data));
    }, []);

    const dropDownProps = {
        selectName: "urls",
        options: allProducts,
        placeholder: "제품을 검색할 수 있어요.",
        onChangeFn: (e) => setSelectedUrl(parseInt(e?.value)),
    };

    return (
        <Box>
            <Flex>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <Grid templateColumns={{ base: "1fr" }} gap={4}>
                <SearchableDropdown {...dropDownProps} />
                <Box style={{ width: "100%", height: "500px" }} bg="white" boxShadow="base" p="6" rounded="md">
                    <GraphChart data={data} />
                </Box>
            </Grid>
        </Box>
    );
}
