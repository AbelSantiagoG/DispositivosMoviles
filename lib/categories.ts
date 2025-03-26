import api from './api';

export interface CategorieData {
    name: string,
    description: string,
    enterprise_id: Number,
    id: 0
}

export const categoriesService = {
    async getAllCategories() {
        const response = await api.get('/categories');
        return response.data;
    },

    async getCategoriesseById(id: number) {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    async createCategories(data: CategorieData) {
        const response = await api.post('/categories', data);
        return response.data;
    },

    async deleteCategories(id: number) {
        await api.delete(`/categories/${id}`);
    }
};
