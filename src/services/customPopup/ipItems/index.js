import api from "../../api";

export function getAllItemsList() {
    return api.get(`/ips/items`);
}

export function getFilteredIps(hasMessage, hasCname, product, visits, startDate, endDate) {
    return api.get(`/ips/topIps`, {
        params: {
            hasMessage: hasMessage ? "Y" : "N",
            hasCname: hasCname ? "Y" : "N",
            product: product ? product : "/",
            visits,
            startDate,
            endDate,
        },
    });
}

export function updateIpDetail(ip, company_name, message_type) {
    return api.put(`/ips/detail`, {
        ip,
        company_name,
        message_type,
    });
}
