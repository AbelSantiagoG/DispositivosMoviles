import { View, Text } from 'react-native';
import { useRouter } from "expo-router";
import { ProductList } from '../../../components/organisms/ProductList';
import { useState, useEffect } from 'react';
import { productService } from '../../../lib/products';
import { ProtectedRoute } from '../../../context/ProtectedRoute';
import { PERMISSIONS } from '../../../constants/permissions';

const Products = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const listProducts = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const data = await productService.getAllProducts();
            const formattedProducts = data.map(product => ({
                id: product.id.toString(),
                name: product.name,
                price: product.public_price,
                image: require('../../../assets/product.png')
            }));
            setProducts(formattedProducts);
        } catch (error) {
            setError('No se pudieron cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listProducts();
    }, []);

    return (
        <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_INVENTARIO}>
            {loading ? (
                <Text className="text-white text-center mt-10">Cargando productos...</Text>
            ) : error ? (
                <Text className="text-red-500 text-center mt-10">{error}</Text>
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