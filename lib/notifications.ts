import api from './api';

interface UserNotificationData {
    userId: string;
    message?: string;
    title?: string;
}

export const notificationsService = {
    // Registrar el token de notificaciones push
    async registerToken(token: string) {
        try {
            const response = await api.post('/notifications/register-token', { 
                token,
                user_id: 1  // ID de usuario hardcodeado
            });
            return response.data;
        } catch (error) {
            console.error('Error al registrar el token:', error);
            throw error;
        }
    },

    // Enviar notificación de prueba al usuario actual
    async sendTestNotification() {
        try {
            const response = await api.post('/notifications/send-test');
            return response.data;
        } catch (error) {
            console.error('Error al enviar notificación de prueba:', error);
            throw error;
        }
    },

    // Enviar notificación a un usuario específico
    async sendToUser(userId: string) {
        try {
            const response = await api.post(`/notifications/send-to-user/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error al enviar notificación al usuario ${userId}:`, error);
            throw error;
        }
    },

    // Obtener lista de usuarios para seleccionar
    async getUsers() {
        try {
            const response = await api.get('/employees');
            return response.data;
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
            throw error;
        }
    }
}; 