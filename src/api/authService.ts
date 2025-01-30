import axiosInstance from "./axiosInstance";

export const signUp = async (userData: { email: string; password: string; nickname: string }) => {
    try {
        const response = await axiosInstance.post("/sign-up", userData);
        return response.data;
    } catch (error: any) {
        console.error("SignUp Error:", error.response?.data || error.message);
        throw error;
    }
};

export const signIn = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axiosInstance.post("/sign-in", credentials);
        const { accessToken } = response.data;

        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }

        return response.data;
    } catch (error: any) {
        console.error("SignIn Error:", error.response?.data || error.message);
        throw error;
    }
};