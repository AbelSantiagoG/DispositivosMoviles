import api from './api';

export interface ProductData {
    name: string;
    description: string;
    status: string;
    stock: number;
    supplier_price: number;
    public_price: number;
    thumbnail: string;
    bar_code: string;
    minimal_safe_stock: number;
    discount: number;
    enterprise_id: number;
    category_id: number;
    supplier_id: number;
}

export const productService = {
    async getAllProducts() {
        const response = await api.get('/products');
        return response.data;
    },

    async getProductById(id: number) {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    async getProductsByCategory(categoryId: number) {
        const response = await api.get(`/products/category/${categoryId}`);
        return response.data;
    },

    async createProduct(data: ProductData) {
        const response = await api.post('/products', data);
        return response.data;
    },

    async updateProduct(id: number, data: Partial<ProductData>) {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    },

    async deleteProduct(id: number) {
        await api.delete(`/products/${id}`);
    }
};
