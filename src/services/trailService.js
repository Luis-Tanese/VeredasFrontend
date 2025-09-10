import apiClient from "./apiClient";

export const getAllTrails = async () => {
    try {
        const response = await apiClient.get("/trails");
        return response.data.trails;
    } catch (error) {
        console.error("Error fetching all trails:", error);
        throw error.response?.data || { message: "An unknown error occurred" };
    }
};

export const getTrailById = async (trailId) => {
    try {
        const response = await apiClient.get(`trails/${trailId}`);
        return response.data.trail;
    } catch (error) {
        console.error(`Error fetching trail with ID ${trailId}:`, error);
        if (error.response && error.response.status === 404) {
            // eslint-disable-next-line no-throw-literal
            throw { ...error.response.data, status: 404 };
        }
        throw error.response?.data || { message: "An unknown error occurred" };
    }
};

export const getTrailDownloadUrl = (trailId, fileType) => {
    const baseUrl = apiClient.defaults.baseURL;

    return `${baseUrl}/trails/${trailId}/download/${fileType}`;
};
