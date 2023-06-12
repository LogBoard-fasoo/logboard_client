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
    return api.get(`/visited-urls/technology`, {
        params: {
            idStr,
            startDate,
            endDate,
        },
    });
}
