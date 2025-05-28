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

export interface Product {
    id: string;
    name: string;
    public_price: number;
    category: string;
    stock: number;
    barcode?: string;
    description?: string;
}

export interface CartItem {
    id: string;
    name: string;
    public_price: number;
    quantity: number;
    category: string;
}

export const productService = {
    async getAllProducts() {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    },

    async getProductById(id: number) {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener producto con ID ${id}:`, error);
            throw error;
        }
    },

    async getProductsByCategory(categoryId: number) {
        try {
            const response = await api.get(`/products/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener productos de la categoría ${categoryId}:`, error);
            throw error;
        }
    },

    async createProduct(data: ProductData) {
        try {
            const response = await api.post('/products', data);
            return response.data;
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    },

    async updateProduct(id: number, data: Partial<ProductData>) {
        try {
            const response = await api.put(`/products/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar producto con ID ${id}:`, error);
            throw error;
        }
    },

    async deleteProduct(id: number) {
        try {
            await api.delete(`/products/${id}`);
        } catch (error) {
            console.error(`Error al eliminar producto con ID ${id}:`, error);
            throw error;
        }
    }
};

export const productsService = {
    // Obtener todos los productos disponibles
    async getProducts() {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    },

    // Buscar producto por código de barras
    async getProductByBarcode(barcode: string) {
        try {
            const response = await api.get(`/products/barcode/${barcode}`);
            return response.data;
        } catch (error) {
            console.error('Error al buscar producto por código de barras:', error);
            throw error;
        }
    },

    // Buscar productos por nombre o categoría
    async searchProducts(query: string) {
        try {
            const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
            return response.data;
        } catch (error) {
            console.error('Error al buscar productos:', error);
            throw error;
        }
    }
};
