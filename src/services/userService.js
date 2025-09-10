import apiClient from "./apiClient";
import { getToken } from "./authService";

const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const toggleFavorite = async (trailId) => {
    try {
        const response = await apiClient.post(
            `/trails/${trailId}/favorite`,
            {},
            {
                headers: getAuthHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error toggling favorite:", error);
        throw error.response?.data || { message: "Failed to update favorites" };
    }
};

export const getMyReviews = async () => {
    try {
        const response = await apiClient.get("/users/my-reviews", {
            headers: getAuthHeaders(),
        });
        return response.data.reviews;
    } catch (error) {
        console.error("Error fetching user reviews:", error);
        throw error.response?.data || { message: "Failed to fetch reviews" };
    }
};

export const updateProfile = async (updateData) => {
    try {
        const response = await apiClient.put("/users/profile", updateData, {
            headers: getAuthHeaders(),
        });
        return response.data.user;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error.response?.data || { message: "Failed to update profile" };
    }
};

export const changePassword = async (passwordData) => {
    try {
        const response = await apiClient.put("/users/change-password", passwordData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error.response?.data || { message: "Failed to change password" };
    }
};
