import { atom } from "recoil";
import getDefaultTimeline from "../../components/utils/getDefaultTimeline";

const [defaultStartDate, defaultEndDate] = getDefaultTimeline();

const initialTimelineState = {
    startDate: "2023-03-03",
    endDate: "2023-06-30",
};

export const initialTimeline = atom({
    key: "initialTimelineSpecificIndustry",
    default: initialTimelineState,
});
