import getDateDifference from "../components/utils/getDateDifference";

export default function useSummarizeTimeline(startDate, endDate) {
    return `${startDate} ~ ${endDate} (${getDateDifference(endDate, startDate)}일)`;
}
