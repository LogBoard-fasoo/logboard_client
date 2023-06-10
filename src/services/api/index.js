import Axios from "axios";
import { getApiEndpoint } from "@/envs";

export const createApi = () => {
    const _api = Axios.create({
        baseURL: getApiEndpoint(),
    });

    return _api;
};

const api = createApi();

export default api;
