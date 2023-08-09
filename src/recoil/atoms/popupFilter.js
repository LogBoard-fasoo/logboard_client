import { atom } from "recoil";
import getDateRangeFromToday from "../../components/utils/getDateRangeFromToday";

const [startDate, endDate] = getDateRangeFromToday();

const initialState = {
    startDate: startDate,
    endDate: endDate,
    hasMessage: window.localStorage.getItem("hasMessage") == "true", // 필터기준1: 메시지 유무
    hasCompany: window.localStorage.getItem("hasCompany") == "true", // 필터기준2: 매칭 기업 유무
    counts: JSON.parse(window.localStorage.getItem("counts")) || 1,
    interestedProducts: window.localStorage.getItem("interestedProducts") || "", // 필터기준3: 관심 제품
    itemsforTrend: "", // 제품 트렌드 검색
    itemsList: [], // 모든 페이지 리스트
    isFetching: true,
};

export const initialCustomPopupState = atom({
    key: "customPopupState",
    default: initialState,
});
