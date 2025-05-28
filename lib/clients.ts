import api from './api';

export interface Client {
  id: number;
  document_number: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateClientRequest {
  document_number: string;
  name: string;
  email: string;
  phone?: string;
}

export interface CreateClientResponse {
  id: number;
  document_number: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export const getClientByDocument = async (documentNumber: string): Promise<Client | null> => {
  try {
    const response = await api.get(`/clients/document/${documentNumber}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null; // Cliente no encontrado
    }
    console.error('Error fetching client by document:', error);
    throw error;
  }
};

export const createClient = async (clientData: CreateClientRequest): Promise<CreateClientResponse> => {
  try {
    const response = await api.post('/clients', clientData);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
}; 