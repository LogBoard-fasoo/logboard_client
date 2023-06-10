// Recoil 사용법: https://recoiljs.org/ko/docs/introduction/getting-started/#:~:text=React%20%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98%20%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0%E2%80%8B,App%EC%9D%84%20%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94%20%EA%B2%83%EC%9D%B4%EB%8B%A4.
import { atom } from "recoil";
import getDefaultTimeline from "../../components/utils/getDefaultTimeline";

const [defaultStartDate, defaultEndDate] = getDefaultTimeline();

const initialTimelineState = {
    startDate: defaultStartDate,
    endDate: defaultEndDate,
};

export const initialTimeline = atom({
    key: "initialTimeline",
    default: initialTimelineState,
});
