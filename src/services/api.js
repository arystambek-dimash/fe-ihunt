import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ihunt.azurewebsites.net/api/v1',
});

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        window.location.href = '/login';
        throw new Error('No refresh token available');
    }
    console.log(refreshToken)
    const response = await axios.post('https://ihunt.azurewebsites.net/api/v1/users/refresh-token', {refreshToken});
    const {accessToken} = response.data;

    localStorage.setItem('accessToken', accessToken);

    return accessToken;
};

api.interceptors.request.use(async (config) => {
    let token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (refreshToken) {
        try {
            token = await refreshAccessToken();
            config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
            console.error('Error refreshing access token', error);
            return Promise.reject(error);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
