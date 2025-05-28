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

    // Enviar recomendaciones de mejora de plan a todos los administradores
    async sendPlanUpgradeRecommendations() {
        try {
            const response = await api.post('/notifications/send-plan-upgrade-recommendations');
            return response.data;
        } catch (error) {
            console.error('Error al enviar recomendaciones de mejora de plan:', error);
            throw error;
        }
    },

    // Enviar recordatorios de pago a los administradores
    async sendPaymentReminders() {
        try {
            const response = await api.post('/notifications/send-payment-reminders');
            return response.data;
        } catch (error) {
            console.error('Error al enviar recordatorios de pago:', error);
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
    },

    // Enviar alerta de pánico a todos los empleados
    async sendPanicAlert() {
        try {
            const response = await api.post('/notifications/panic-button');
            return response.data;
        } catch (error) {
            console.error('Error al enviar alerta de pánico:', error);
            throw error;
        }
    }
}; 