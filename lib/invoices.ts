import api from './api';

export interface InvoiceSale {
  quantity: number;
  product_id: number;
}

export interface CreateInvoiceRequest {
  payment_method: 'cash' | 'credit_card' | 'debit_card';
  sales: InvoiceSale[];
}

export interface CreateInvoiceResponse {
  id: number;
  total: number;
  payment_method: string;
  created_at: string;
  // Agregar más campos según la respuesta del backend
}

export const createInvoice = async (invoiceData: CreateInvoiceRequest): Promise<CreateInvoiceResponse> => {
  try {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}; 