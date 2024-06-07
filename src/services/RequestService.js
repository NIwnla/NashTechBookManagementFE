import { api } from "../api/axiosInstance";

const RequestService = {
    getRequests: async (params) => {
        try {
            const response = await api.getRequests(params);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getRequestById: async (id) => {
        try {
            const response = await api.getRequestById(id);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createRequest: async (request) => {
        try {
            const response = await api.createRequest(request);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateRequest: async (id, request) => {
        try {
            const response = await api.updateRequest(id, request);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    approveRequest: async (id, request) => {
        try {
            const response = await api.approveRequest(id, request);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default RequestService;
