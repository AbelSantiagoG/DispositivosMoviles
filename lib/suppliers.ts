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
        try {
            const response = await api.get('/suppliers');
            return response.data;
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
            throw error;
        }
    },

    async getSupplierById(id: number) {
        try {
            const response = await api.get(`/suppliers/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener proveedor con ID ${id}:`, error);
            throw error;
        }
    },

    async createSupplier(data: SupplierData) {
        try {
            const response = await api.post('/suppliers', data);
            return response.data;
        } catch (error) {
            console.error('Error al crear proveedor:', error);
            throw error;
        }
    },

    async updateSupplier(id: number, data: Partial<SupplierData>) {
        try {
            const response = await api.put(`/suppliers/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar proveedor con ID ${id}:`, error);
            throw error;
        }
    },

    async deleteSupplier(id: number) {
        try {
            await api.delete(`/suppliers/${id}`);
        } catch (error) {
            console.error(`Error al eliminar proveedor con ID ${id}:`, error);
            throw error;
        }
    }
};
