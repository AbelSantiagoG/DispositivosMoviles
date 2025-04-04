import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationsService } from './notifications';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
    lastname: string;
    telephone: string;
}

export const authService = {
    async login(credentials: LoginCredentials) {
        const formData = new FormData();
        formData.append('username', credentials.email);
        formData.append('password', credentials.password);
        
        const response = await api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }        
        });
        if (response.data.access_token) {
            //localStorage.setItem('token', response.data.access_token);
            await AsyncStorage.setItem('@auth', response.data.access_token);
        }
        //console.log(response);
        return response.data;
    },

    async register(data: RegisterData) {
        const response = await api.post('/employees', data);
        return response.data;
    },

    async getCurrentUser() {
        try {
            const response = await api.get('/employees/me');
            console.log(response);
            return response.data;
        } catch (error) {
            console.log('Error al obtener la información del usuario:', error);
            return null;
        }
    },

    async registerPushToken(token: string) {
        try {
            const response = await notificationsService.registerToken(token);
            console.log('Token de notificaciones registrado correctamente:', token);
            return response;
        } catch (error) {
            console.error('Error al registrar el token de notificaciones:', error);
            throw error;
        }
    },

    async logout() {
        await AsyncStorage.removeItem('@auth');
    }
};