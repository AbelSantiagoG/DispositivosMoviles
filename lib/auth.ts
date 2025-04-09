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

export interface UpdateProfileData {
    name?: string;
    lastname?: string;
    telephone?: string;
}

export const authService = {
    async login(credentials: LoginCredentials) {
        try {
            const formData = new FormData();
            formData.append('username', credentials.email);
            formData.append('password', credentials.password);
            
            const response = await api.post('/auth/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }        
            });
            if (response.data.access_token) {
                await AsyncStorage.setItem('@auth', response.data.access_token);
            }
            return response.data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    },

    async register(data: RegisterData) {
        try {
            const response = await api.post('/employees', data);
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    },

    async getCurrentUser() {
        try {
            const response = await api.get('/employees/me');
            return response.data;
        } catch (error) {
            console.log('Error al obtener la información del usuario:', error);
            return null;
        }
    },
    
    async updateUserProfile(data: UpdateProfileData) {
        try {
            // Primero obtenemos el usuario actual para tener su ID
            const currentUser = await this.getCurrentUser();
            if (!currentUser || !currentUser.id) {
                throw new Error('No se pudo obtener la información del usuario actual');
            }
            
            // Actualizamos el perfil utilizando el endpoint de employees
            const response = await api.put(`/employees/${currentUser.id}`, data);
            console.log('Perfil actualizado correctamente');
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el perfil del usuario:', error);
            throw error;
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
        try {
            await AsyncStorage.removeItem('@auth');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            throw error;
        }
    },

    async sendRecoveryEmail(email: string) {
        try {
            const response = api.post(`/auth/password-recovery/${email}`);
            return response;
        } catch (error) {
            console.log('Error al enviar el correo de recuperación de contraseña: ', error);
            throw error;
        }
    },

    async resetPassword(email: string, token: string, new_password: string) {
        try {
            const response = api.post(`auth/reset-password`, {
                email,
                token,
                new_password
            });
            return response;
        } catch (error) {
            console.log('Error al reiniciar la contraseña: ', error);
            throw error;
        }
    }
};