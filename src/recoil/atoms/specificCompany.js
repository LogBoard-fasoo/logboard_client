import { atom } from "recoil";

const initialTimelineState = {
    startDate: "2022-03-01",
    endDate: "2023-06-01",
};

export const initialTimeline = atom({
    key: "initialTimelineSpecificCompany",
    default: initialTimelineState,
});
