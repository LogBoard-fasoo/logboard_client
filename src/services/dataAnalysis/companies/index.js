import api from "../../api";

export function getTop30Companies(startDate, endDate) {
    return api.get(`/companies/visited/top30`, {
        params: {
            startDate,
            endDate,
        },
    });
}

export function getTop5UrlOfCompany(companyId, startDate, endDate) {
    return api.get(`/interested-products/top5`, {
        params: {
            companyId,
            startDate,
            endDate,
        },
    });
}

export function getTopCategoryOfCompany(companyId, startDate, endDate) {
    return api.get(`/interested-category`, {
        params: {
            companyId,
            startDate,
            endDate,
        },
    });
}
