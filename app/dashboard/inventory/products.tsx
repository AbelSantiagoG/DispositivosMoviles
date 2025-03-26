import { View, Text } from 'react-native';
import { useRouter } from "expo-router";
import { ProductList } from '../../../components/organisms/ProductList';
import { useState, useEffect } from 'react';
import { productService } from '../../../lib/products';
import { ProtectedRoute } from '../../../context/ProtectedRoute';

const Products = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const listProducts = async () => {
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
            console.error('Error al obtener productos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listProducts();
    }, []);

    return (
        <ProtectedRoute permissionName="GESTIONAR_INVENTARIO">
            {loading ? (
                <Text className="text-white text-center mt-10">Cargando productos...</Text>
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