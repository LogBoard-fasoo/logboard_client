import { useState } from "react";
import useSummarizeTimeline from "./useSummarizeTimeline";
import { getTypeName, summarizeUrls } from "../components/utils/summarizeKeys";

export default function useSummaryContent(startDate, endDate, categoryId, industryId, technologyId) {
    const timelineStr = useSummarizeTimeline(startDate, endDate);
    const noResultStr = "기간 선택 또는 검색어를 입력해주세요.";
    const [summaryContent, _setSummaryContent] = useState({
        카테고리: noResultStr,
        산업군: noResultStr,
        사용기술: noResultStr,
    });

    const categoryStr = categoryId
        ? `${timelineStr} 동안 ${getTypeName("categories", categoryId)} 카테고리에 속한 기업은 ${summarizeUrls(
              "topUrlByCategory",
              categoryId,
          )} 제품에 큰 관심을 보입니다. `
        : noResultStr;

    const industryStr = industryId
        ? `${timelineStr} 동안  ${getTypeName("industries", industryId)} 산업군에 속한 기업은 ${summarizeUrls(
              "topUrlByIndustry",
          )} 제품에 큰 관심을 보였습니다. `
        : noResultStr;

    const technologyStr = industryId
        ? `${timelineStr} 동안  ${getTypeName("technologies", technologyId)} 제품을 사용하는 기업은 ${summarizeUrls(
              "topUrlByIndustry",
          )} 제품에 큰 관심을 보였습니다. `
        : noResultStr;

    const setSummaryContent = () =>
        _setSummaryContent((d) => ({
            ...d,
            카테고리: categoryStr,
            산업군: industryStr,
            사용기술: technologyStr,
        }));
    return [summaryContent, setSummaryContent];
}
