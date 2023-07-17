import api from "../../api";

export function getMessage(ip_address) {
    return api.get(`/message`, {
        params: {
            ip_address,
        },
    });
}

export function updateMessage(ips, content, valid_date, url) {
    return api.put(`/message/update`, {
        ips,
        content,
        valid_date,
        url,
    });
}
