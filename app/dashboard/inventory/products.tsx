import { View, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import { ProductList } from '../../../components/organisms/ProductList';
import { useState, useEffect } from 'react';
import { useProductService } from '../../../lib/products';
import { useCategoryService } from '../../../lib/categories';
import { ProtectedRoute } from '../../../context/ProtectedRoute';
import { PERMISSIONS } from '../../../constants/permissions';

interface Product {
    id: number;
    name: string;
    public_price: number;
    thumbnail: string | null;
    [key: string]: any;
}

const Products = () => {
    const router = useRouter();
    const { refresh } = useLocalSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    let productService;
    let categoryService;

    try {
        productService = useProductService();
        categoryService = useCategoryService();
    } catch (error) {
        console.error('Error al inicializar servicios:', error);
        setError('Error al inicializar los servicios');
        setLoading(false);
        return null;
    }

    const listProducts = async () => {
        if (!productService || !categoryService) {
            setError('Servicios no disponibles');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Primero cargar categorías para asegurar que estén disponibles
            await categoryService.getAllCategories();
            
            // Luego cargar productos
            const data = await productService.getAllProducts();
            const formattedProducts = data.map((product: Product) => ({
                id: product.id.toString(),
                name: product.name,
                price: product.public_price,
                image: productService.getImageUrl(product.thumbnail),
            }));
            setProducts(formattedProducts);
        } catch (error: any) {
            const errorMessage = error?.message || 'No se pudieron cargar los productos';
            setError(errorMessage);
            console.error('Error al cargar productos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listProducts();
    }, [refresh]);

    if (!productService || !categoryService) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500 text-center">Error: Servicios no disponibles</Text>
            </View>
        );
    }

    return (
        <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_INVENTARIO}>
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-white text-center mt-10">Cargando productos...</Text>
                </View>
            ) : error ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500 text-center mt-10">{error}</Text>
                </View>
            ) : (
                <ProductList 
                    products={products}
                    refreshProducts={listProducts}
                />
            )}
        </ProtectedRoute>
    );
};

export default Products;
