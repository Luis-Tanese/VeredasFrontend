import apiClient from "./apiClient";
import { getToken } from "./authService";

const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createReview = async (reviewData) => {
    try {
        const response = await apiClient.post("/reviews", reviewData, {
            headers: getAuthHeaders(),
        });
        return response.data.review;
    } catch (error) {
        console.error("Error creating review:", error);
        throw error.response?.data || { message: "Failed to create review" };
    }
};

export const getAllReviews = async () => {
    try {
        const response = await apiClient.get("/reviews");
        return response.data.reviews;
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        throw error.response?.data || { message: "Failed to fetch reviews" };
    }
};

export const updateReview = async ({ reviewId, updateData }) => {
    try {
        const response = await apiClient.put(`/reviews/${reviewId}`, updateData, {
            headers: getAuthHeaders(),
        });
        return response.data.review;
    } catch (error) {
        console.error("Error updating review:", error);
        throw error.response?.data || { message: "Failed to update review" };
    }
};

export const deleteReview = async (reviewId) => {
    try {
        const response = await apiClient.delete(`/reviews/${reviewId}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting review:", error);
        throw error.response?.data || { message: "Failed to delete review" };
    }
};
