import { api } from "../api/axiosInstance";

export const RequestDetailService = {
    getRequestDetails: async () => {
        try {
            const response = await api.getRequestDetails();
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getRequestDetailById: async (id) => {
        try {
            const response = await api.getRequestDetailById(id);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createRequestDetail: async (requestDetail) => {
        try {
            const response = await api.createRequestDetail(requestDetail);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    returnBookRequestDetail: async (returnBook) => {
        try {
            const response = await api.returnBookRequestDetail(returnBook);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteRequestDetail: async (params) => {
        try {
            const response = await api.deleteRequestDetail(params);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default RequestDetailService;

