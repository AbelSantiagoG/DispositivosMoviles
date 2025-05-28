import api from './api';

export interface RegisterData {
  enterprise_name: string;
  nit: string;
  enterprise_email: string;
  enterprise_phone: string;
  city: string;
  employee_name: string;
  employee_lastname: string;
  employee_email: string;
  employee_phone: string;
  password: string;
}

export const registerService = {
  async register(data: RegisterData) {
    try {
      const response = await api.post('/register', data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error al registrar. Por favor, intente nuevamente.');
    }
  }
}; 