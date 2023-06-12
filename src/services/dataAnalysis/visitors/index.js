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

export function getWeeklyTrendsByCompany(companyIds, startDate, endDate) {
    return api.get(
        `/visitors/weekly-trends/company${"?companyIds=" + companyIds.map((c) => c.value).join("&companyIds=")}`,
        {
            params: {
                startDate,
                endDate,
            },
        },
    );
}

export function getWeeklyTrendByUrl(url, startDate, endDate) {
    return api.get(`/visitors/weekly-trends/URL`, {
        params: {
            url,
            startDate,
            endDate,
        },
    });
}
