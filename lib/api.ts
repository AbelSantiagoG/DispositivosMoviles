import axios from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'https://martinostios.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para manejar tokens
api.interceptors.request.use( async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('@auth');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}); 


export default api;