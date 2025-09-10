import axios from "axios";

const API_URL = "https://veredas-backend.vercel.app/api";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
