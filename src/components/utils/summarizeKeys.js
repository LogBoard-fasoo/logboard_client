import { queryClient } from "../../App";

export function summarizeKeys(queryKey) {
    const data = queryClient.getQueryData([queryKey])?.data;
    return data && data.map((d, idx) => ` (${idx + 1}) ${d.id}`);
}

export function summarizeUrls(queryKey) {
    const data = queryClient.getQueryData([queryKey])?.data;
    return data && data.map((d, idx) => ` (${idx + 1}) ${d.url}`);
}

export function getTypeName(queryKey, id) {
    const data = queryClient.getQueryData([queryKey])?.data;
    return data && data[id - 1]?.label;
}

export function getTop5CompaniesName() {
    const data = queryClient.getQueryData(["getTop30Companies"])?.data;
    return data && data.slice(0, 5).map((c, idx) => ` (${idx + 1}) ${c.name}`);
}
