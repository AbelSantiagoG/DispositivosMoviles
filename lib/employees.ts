import api from './api';

export interface EmployeeData {
    name: string;
    email: string;
    code: string;
    lastname: string;
    telephone: string;
    password: string;
    enterprise_id: number;
    role_id: number;
}

export const employeeService = {
    async getAllEmployees() {
        try {
            const response = await api.get('/employees');
            return response.data;
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            throw error; // Relanzamos el error para que el componente pueda manejarlo si es necesario
        }
    },

    async getEmployeeById(id: number) {
        try {
            const response = await api.get(`/employees/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener empleado con ID ${id}:`, error);
            throw error;
        }
    },

    async createEmployee(data: EmployeeData) {
        try {
            const response = await api.post('/employees', data);
            return response.data;
        } catch (error) {
            console.error('Error al crear empleado:', error);
            throw error;
        }
    },

    async updateEmployee(id: number, data: Partial<EmployeeData>) {
        try {
            const response = await api.put(`/employees/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar empleado con ID ${id}:`, error);
            throw error;
        }
    },

    async deleteEmployee(id: number) {
        try {
            await api.delete(`/employees/${id}`);
        } catch (error) {
            console.error(`Error al eliminar empleado con ID ${id}:`, error);
            throw error;
        }
    },

    async activateEmployee(id: number) {
        try {
            const response = await api.patch(`/employees/${id}/activate`);
            return response.data;
        } catch (error) {
            console.error(`Error al activar empleado con ID ${id}:`, error);
            throw error;
        }
    },

    async deactivateEmployee(id: number) {
        try {
            const response = await api.patch(`/employees/${id}/deactivate`);
            return response.data;
        } catch (error) {
            console.error(`Error al desactivar empleado con ID ${id}:`, error);
            throw error;
        }
    }
};