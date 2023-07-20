import api from "../../api";

export function getMessage(ip_address) {
    return api.get(`/message`, {
        params: {
            ip_address,
        },
    });
}

export function updateMessage(ips, content, valid_date, url) {
    const contentFormatted = content
        .replaceAll(" <strong>", "&nbsp;<strong>")
        .split("<br/>")
        .reduce((acc, item) => acc + `<span>${item}</span>`, "");
    return api.put(`/message/update`, {
        ips,
        content: contentFormatted,
        valid_date,
        url,
    });
}

export function resetMessage(ips) {
    return api.put(`/message/update`, {
        ips,
        content: null,
        valid_date: null,
        url: null,
    });
}
