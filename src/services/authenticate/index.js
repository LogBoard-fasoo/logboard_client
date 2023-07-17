import api from "../api";

export function authenticateUser() {
    return api.get(`/user`);
}
