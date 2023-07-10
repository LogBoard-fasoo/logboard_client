import { atom } from "recoil";
import getDateRangeFromToday from "../components/utils/getDateRangeFromToday";

const [startDate, endDate] = getDateRangeFromToday();

const initialState = {
    startDate: startDate,
    endDate: endDate,
    hasMessage: false, // 필터기준1: 메시지 유무
    hasCompany: false, // 필터기준2: 매칭 기업 유무
    counts: 1,
    interestedProducts: [], // 필터기준3: 관심 제품
};

export const initialCustomPopupState = atom({
    key: "customPopupState",
    default: initialState,
});
