import api from './api';

const API_BASE_URL = 'https://martinostios.com';

// Función para generar un código de barras único
const generateUniqueBarcode = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `PRD-${timestamp}-${random}`;
};

export interface ProductData {
    name: string;
    description: string;
    status: "active" | "inactive";
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

export interface ProductImageData extends ProductData {
    image?: {
        uri: string;
        type: string;
        name: string;
    };
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
            const response = await api.post('/products', {
                ...data,
                bar_code: generateUniqueBarcode(),
            });
            return response.data;
        } catch (error: any) {
            console.error('Error al crear producto:', error.response?.data || error);
            throw error;
        }
    },

    async createProductWithImage(data: ProductImageData) {
        try {
            const formData = new FormData();
            
            // Generar código de barras único
            const barCode = generateUniqueBarcode();
            
            // Agregar cada campo individualmente al FormData
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('status', data.status);
            formData.append('stock', data.stock.toString());
            formData.append('supplier_price', data.supplier_price.toString());
            formData.append('public_price', data.public_price.toString());
            formData.append('bar_code', barCode);
            formData.append('minimal_safe_stock', data.minimal_safe_stock.toString());
            formData.append('discount', (data.discount || 0).toString());
            formData.append('enterprise_id', data.enterprise_id.toString());
            formData.append('category_id', data.category_id.toString());
            formData.append('supplier_id', data.supplier_id.toString());

            // Agregar imagen si existe
            if (data.image) {
                const imageFile = {
                    uri: data.image.uri,
                    type: 'image/jpeg',
                    name: 'product_image.jpg',
                };
                formData.append('image', imageFile as any);
            }

            console.log('FormData enviado:', Object.fromEntries(formData as any));

            const response = await api.post('/products/create-with-image', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                transformRequest: (data) => {
                    return data;
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Error al crear producto:', error.response?.data || error);
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
    },

    getImageUrl(thumbnail: string | null) {
        if (!thumbnail) {
            return require('../assets/product.png');
        }
        return { uri: `${API_BASE_URL}/static/images/${thumbnail}` };
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
