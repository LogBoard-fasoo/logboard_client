import React, { useEffect, useState } from "react";
import GraphChart from "../common/GraphChart";
import { Box, Flex, Grid, Heading, Link, List, ListIcon, ListItem, Spacer } from "@chakra-ui/react";
import CustomDateRangePicker from "../common/Datepicker";
import { initialTimeline } from "../../recoil/atoms/specificProduct";
import { useRecoilState } from "recoil";
import SearchableDropdown from "../common/SearchableDropdown";
import { getAllUrls } from "../../services/dataAnalysis/types";
import { getWeeklyTrendByUrl } from "../../services/dataAnalysis/visitors";
import CustomTooltip from "../common/Tooltip";
import AlertInfo from "../common/AlertInfo";
import { FiCheckCircle, FiExternalLink } from "react-icons/fi";
import NoResultFound from "../common/NoResultFound";

export default function SpecificProduct() {
    const [timeline, setTimeline] = useRecoilState(initialTimeline);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [urlTrend, setUrlTrend] = useState([]);

    const { startDate, endDate } = timeline;

    useEffect(() => {
        getAllUrls().then((res) => setAllProducts(res.data));
    }, []);

    useEffect(() => {
        selectedUrl && getWeeklyTrendByUrl(selectedUrl, startDate, endDate).then((res) => setUrlTrend([res.data]));
    }, [selectedUrl, startDate, endDate]);

    const dropDownProps = {
        selectName: "urls",
        options: allProducts,
        placeholder: "제품을 검색할 수 있어요.",
        onChangeFn: (e) => setSelectedUrl(e.label),
    };

    return (
        <Box>
            <AlertInfo
                title={"검색 방법과 의미가 궁금해요!"}
                content={
                    <List spacing={3}>
                        <ListItem>
                            <Flex alignItems={"center"}>
                                <FiCheckCircle color="green" size={15} />
                                <span>&nbsp; 제품명은 fasoo.com의 제품 url로 검색할 수 있어요.</span>
                            </Flex>
                        </ListItem>
                        <ListItem>
                            <Link href="https://www.fasoo.com/solutions/ransomware" isExternal>
                                <Flex alignItems={"center"}>
                                    <FiExternalLink /> &nbsp; 예시.
                                </Flex>
                                <strong>제품명:</strong> 랜섬웨어 대응 솔루션 <br />
                                <strong>검색어:</strong> solutions/ransomware <br />
                            </Link>
                        </ListItem>
                    </List>
                }
            ></AlertInfo>
            <Flex my={3}>
                <Spacer />
                <CustomDateRangePicker timeline={timeline} setTimeline={setTimeline} />
            </Flex>
            <Grid templateColumns={{ base: "1fr" }} gap={4}>
                <SearchableDropdown {...dropDownProps} />
                <GraphBox data={urlTrend} />
            </Grid>
        </Box>
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
                            <li>선택한 제품 (url)의 주별 방문 트렌드에요.</li>
                        </small>
                    }
                />
            </Heading>
            {data.length > 0 ? <GraphChart data={data} x={"날짜"} y={"방문횟수"} /> : <NoResultFound />}
        </Box>
    );
}
