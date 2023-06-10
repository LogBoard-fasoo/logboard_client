import api from "../../api";

export function getAllCategoryTypes() {
    return api.get(`/types/category`);
}

export function getAllIndsutryTypes() {
    return api.get(`/types/industry`);
}

export function getAllTechnologyTypes() {
    return api.get(`/types/technology`);
}

export function getAllCompanies() {
    return api.get(`/types/company`);
}

export function getAllUrls() {
    return api.get(`/types/url`);
}
