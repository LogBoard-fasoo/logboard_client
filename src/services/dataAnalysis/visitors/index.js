import api from "../../api";

export function getCountsByCategory(count, startDate, endDate) {
    return api.get(`/visitors/category`, {
        params: {
            count,
            startDate,
            endDate,
        },
    });
}

export function getCountsByIndustry(count, startDate, endDate) {
    return api.get(`/visitors/industry`, {
        params: {
            count,
            startDate,
            endDate,
        },
    });
}

export function getCountsByTechnology(count, startDate, endDate) {
    return api.get(`/visitors/technology`, {
        params: {
            count,
            startDate,
            endDate,
        },
    });
}

export function getWeeklyTrendsByCompany(company_id, startDate, endDate) {
    return api.get(`/visitors/weekly-trends/company`, {
        params: {
            company_id,
            startDate,
            endDate,
        },
    });
}
