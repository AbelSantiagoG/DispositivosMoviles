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
        const response = await api.get('/employees');
        return response.data;
    },

    async getEmployeeById(id: number) {
        const response = await api.get(`/employees/${id}`);
        return response.data;
    },

    async createEmployee(data: EmployeeData) {
        const response = await api.post('/employees', data);
        return response.data;
    },

    async updateEmployee(id: number, data: Partial<EmployeeData>) {
        const response = await api.put(`/employees/${id}`, data);
        return response.data;
    },

    async deleteEmployee(id: number) {
        await api.delete(`/employees/${id}`);
    },

    async activateEmployee(id: number) {
        const response = await api.patch(`/employees/${id}/activate`);
        return response.data;
    },

    async deactivateEmployee(id: number) {
        const response = await api.patch(`/employees/${id}/deactivate`);
        return response.data;
    }
};