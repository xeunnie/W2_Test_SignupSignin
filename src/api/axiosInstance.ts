import axios from "axios";

const API_BASE_URL = "https://localhost:8080";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized: 리다이렉션으로 보내야 합니다.");
            // TODO: 로그아웃 처리 및 리디렉션 추가 필요함
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;