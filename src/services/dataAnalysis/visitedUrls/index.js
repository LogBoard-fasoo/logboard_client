import api from "../../api";

export function getTopVisitedUrlByCategory(category_id, startDate, endDate) {
    return api.get(`/visited-urls/category`, {
        params: {
            category_id,
            startDate,
            endDate,
        },
    });
}

export function getTopVisitedUrlByIndustry(industry_id, startDate, endDate) {
    return api.get(`/visited-urls/category`, {
        params: {
            industry_id,
            startDate,
            endDate,
        },
    });
}

export function getTopVisitedUrlByTechnoology(technology_id_lst, startDate, endDate) {
    return api.get(`/visited-urls/category`, {
        params: {
            technology_id_lst, // **TODO: key 이름 문의
            startDate,
            endDate,
        },
    });
}
