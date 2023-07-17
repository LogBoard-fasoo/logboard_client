import api from "../../api";

export function getIpTopItemsByCount(ip, startDate, endDate) {
    return api.get(`/analytics/items/count`, {
        params: {
            ip,
            startDate,
            endDate,
        },
    });
}

export function getIpTopItemsByInterest(ip, startDate, endDate) {
    return api.get(`/analytics/items/interest`, {
        params: {
            ip,
            startDate,
            endDate,
        },
    });
}

export function getItemTrendByIp(ip, product, startDate, endDate) {
    return api.get(`/analytics/items/trend`, {
        params: {
            ip,
            product,
            startDate,
            endDate,
        },
    });
}
