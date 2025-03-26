import api from './api';

export interface SupplierData {
    name: string,
    email: string,
    phone_number: string,
    id?: number,
    enterprise_id: number
}

export const supplierService = {
    async getAllSuppliers() {
        const response = await api.get('/suppliers');
        return response.data;
    },

    async getSupplierById(id: number) {
        const response = await api.get(`/suppliers/${id}`);
        return response.data;
    },

    async createSupplier(data: SupplierData) {
        const response = await api.post('/suppliers', data);
        return response.data;
    },

    async updateSupplier(id: number, data: Partial<SupplierData>) {
        const response = await api.put(`/suppliers/${id}`, data);
        return response.data;
    },

    async deleteSupplier(id: number) {
        await api.delete(`/suppliers/${id}`);
    }
};
