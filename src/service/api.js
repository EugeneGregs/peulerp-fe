import axios from "axios";
import { BASE_URL } from "../common/Constants";

const API = axios.create({ baseURL: BASE_URL });
export const API_PRIVATE = axios.create(
    {
        baseURL: BASE_URL,
        headers: {"Content-Type": "application/json"},
        withCredentials: true
    }
);

export default API;