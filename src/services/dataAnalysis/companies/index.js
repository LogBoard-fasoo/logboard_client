import api from "../../api";

export function getTop30Companies(startDate, endDate) {
    return api.get(`/companies/visited/top30`, {
        params: {
            startDate,
            endDate,
        },
    });
}
