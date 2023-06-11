import { atom } from "recoil";
import getDefaultTimeline from "../../components/utils/getDefaultTimeline";

const [defaultStartDate, defaultEndDate] = getDefaultTimeline();

const initialState = {
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    filter: 1,
};

export const initialMappingState = atom({
    key: "ipMappingState",
    default: initialState,
});
