import { atom } from "recoil";
import getDateRangeFromToday from "../../components/utils/getDateRangeFromToday";

const [defaultStartDate, defaultEndDate] = getDateRangeFromToday();

const initialState = {
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    filterInterest: 1, // 필터기준1: 관심도
    filterCompany: 2, // 필터기준2: 매칭 기업 유무
    filterProduct: "", // 필터기준3: 관심 페이지
    filterTrend: "", // 필터기준4: 방문 기록
    filterMessage: 2, // 필터기준5: 메시지
};

export const initialMappingState = atom({
    key: "ipMappingState",
    default: initialState,
});
