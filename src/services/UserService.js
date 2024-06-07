import { api } from '../api/axiosInstance';

const UserService = {
    login: async (loginForm) => {
        try {
            const response = await api.login(loginForm);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error(error.response.data);
            }
        }
    },
    register: async (registerForm) => {
        try {
            const response = await api.register(registerForm);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;


