import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7185/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

axiosInstance.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
);

export const api = {
    // Books
    getBooks: ({ page = 1, pageSize = 10, sort = '', order = '', search = '' } = {}) =>
        axiosInstance.get('/Books', {
            params: {
                page: page,
                pageSize: pageSize,
                sort: sort,
                order: order,
                search: search,
            }
        })
    ,
    getAvailableBooks: ({ requestId, userId }) =>
        axiosInstance.get('/Books/available', {
            params: {
                requestId: requestId,
                userId: userId
            }
        }),
    getBookById: (id) => axiosInstance.get(`/Books/${id}`),
    createBook: (book) => axiosInstance.post('/Books', book),
    updateBook: (id, book) => axiosInstance.put(`/Books/${id}`, book),
    deleteBook: (id) => axiosInstance.delete(`/Books/${id}`),

    // Categories
    getCategories: ({ page = 1, pageSize = 10, search = '', paginate = true } = {}) =>
        axiosInstance.get('/Categories', {
            params: {
                page: page,
                pageSize: pageSize,
                search: search,
                paginate: paginate
            }
        }),
    getCategoryById: (id) => axiosInstance.get(`/Categories/${id}`),
    createCategory: (category) => axiosInstance.post('/Categories', category),
    updateCategory: (id, category) => axiosInstance.put(`/Categories/${id}`, category),
    deleteCategory: (id) => axiosInstance.delete(`/Categories/${id}`),

    // RequestDetails
    getRequestDetails: () => axiosInstance.get('/RequestDetails'),
    getRequestDetailById: (id) => axiosInstance.get(`/RequestDetails/${id}`),
    createRequestDetail: (requestDetail) => axiosInstance.post('/RequestDetails', requestDetail),
    returnBookRequestDetail: (returnBook) => axiosInstance.put('/RequestDetails/return', returnBook),
    deleteRequestDetail: ({ id, userId }) => axiosInstance.delete(`/RequestDetails/${id}`, { params: { userId: userId } }),

    // Requests
    getRequests: ({ page = 1, pageSize = 10, userId = null, title = '', type = null } = {}) =>
        axiosInstance.get('/Requests', {
            params: {
                pageNumber: page,
                pageSize: pageSize,
                userId: userId,
                title: title,
                type: type
            }
        }),
    getRequestById: (id) => axiosInstance.get(`/Requests/${id}`),
    createRequest: (request) => axiosInstance.post('/Requests', request),
    updateRequest: (id, request) => axiosInstance.put(`/Requests/${id}`, request),
    approveRequest: (id, request) => axiosInstance.put(`/Requests/${id}/approval`, request),

    // Users
    login: (loginForm) => axiosInstance.post('/Users/Login', loginForm),
    register: (registerForm) => axiosInstance.post('/Users/Register', registerForm),
};

export default axiosInstance;
