import { api } from "../api/axiosInstance";

export const CategoryService = {
    getCategories: async (params) => {
        try {
            const response = await api.getCategories(params);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data);
        }
    },

    getCategoryById: async (id) => {
        try {
            const response = await api.getCategoryById(id);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createCategory: async (Category) => {
        try {
            const response = await api.createCategory(Category);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateCategory: async (id, Category) => {
        try {
            const response = await api.updateCategory(id,Category);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteCategory: async (id) => {
        try {
            const response = await api.deleteCategory(id);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
