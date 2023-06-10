import { atom } from "recoil";
import getDefaultTimeline from "../../components/utils/getDefaultTimeline";

const [defaultStartDate, defaultEndDate] = getDefaultTimeline();

const initialTimelineState = {
    startDate: defaultStartDate,
    endDate: defaultEndDate,
};

export const initialTimeline = atom({
    key: "initialTimelineSpecificProduct",
    default: initialTimelineState,
});
