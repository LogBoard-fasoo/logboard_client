import api from "../../api";

export function getTopVisitedUrlByCategory(id, startDate, endDate) {
    return api.get(`/visited-urls/category`, {
        params: {
            id,
            startDate,
            endDate,
        },
    });
}

export function getTopVisitedUrlByIndustry(id, startDate, endDate) {
    return api.get(`/visited-urls/category`, {
        params: {
            id,
            startDate,
            endDate,
        },
    });
}

export function getTopVisitedUrlByTechnoology(idStr, startDate, endDate) {
    return api.get(`/visited-urls/category`, {
        params: {
            idStr, // **TODO: key 이름 문의
            startDate,
            endDate,
        },
    });
}
