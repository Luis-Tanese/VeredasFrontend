import apiClient from "./apiClient";

const setToken = (token) => {
    localStorage.setItem("authToken", token);
};

export const getToken = () => {
    return localStorage.getItem("authToken");
};

export const removeToken = () => {
    localStorage.removeItem("authToken");
};

export const login = async (credentials) => {
    try {
        const response = await apiClient.post("/auth/login", credentials);
        if (response.data.token) {
            setToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error.response?.data || { message: "An unknown login error occurred" };
    }
};

export const register = async (userData) => {
    try {
        const response = await apiClient.post("/auth/register", userData);
        if (response.data.token) {
            setToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error.response?.data || { message: "An unknown registration error occurred" };
    }
};

export const logout = () => {
    removeToken();
};

export const verifyToken = async () => {
    const token = getToken();
    if (!token) {
        return Promise.reject("No token found");
    }
    try {
        const response = await apiClient.get("/auth/verify", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Token verification error:", error);
        removeToken();
        throw error.response?.data || { message: "Session expired" };
    }
};
