import { useRecoilValue } from "recoil";
import getDateDifference from "../components/utils/getDateDifference";

export default function useSummarizeTimeline(initialTimeline) {
    const { startDate, endDate } = useRecoilValue(initialTimeline);
    return `${startDate} ~ ${endDate} (${getDateDifference(endDate, startDate)}일)`;
}
