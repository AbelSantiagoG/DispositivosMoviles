import api from './api';

export interface EnterpriseData {
    name: string,
    NIT: string,
    email: string,
    phone_number: string,
    currency: string,
    id: 0
}

export const enterpriseService = {
    async getAllEnterprises() {
        const response = await api.get('/enterprises');
        return response.data;
    },

    async getEnterpriseById(id: number) {
        const response = await api.get(`/enterprises/${id}`);
        return response.data;
    },

    async createEnterprise(data: EnterpriseData) {
        const response = await api.post('/enterprises', data);
        return response.data;
    },

    async deleteEnterprise(id: number) {
        await api.delete(`/enterprises/${id}`);
    }
};
