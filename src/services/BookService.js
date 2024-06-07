import { api } from "../api/axiosInstance";

const BookService = {
    getBooks: async (params) => {
        try {
            const response = await api.getBooks(params);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAvailableBooks: async (params) => {
        try {
            const response = await api.getAvailableBooks(params);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getBookById: async (id) => {
        try {
            const response = await api.getBookById(id);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createBook: async (book) => {
        try {
            const response = await api.createBook(book);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateBook: async (id, book) => {
        try {
            const response = await api.updateBook(id, book);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteBook: async (id) => {
        try {
            const response = await api.deleteBook(id);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default BookService;
