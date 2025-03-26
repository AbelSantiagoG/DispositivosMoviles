import { View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { ProductCard } from '../molecules/ProductCard';
import { AddProductModal } from '../molecules/AddProductModal';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoFormSchema, type ProductoFormData } from '../../validators/products';
import { productService } from '../../lib/products';

interface Product {
    id: string;
    name: string;
    price: number;
    image: any;
}

interface ProductListProps {
    products: Product[];
    refreshProducts: () => Promise<void>;
}

export function ProductList({ products, refreshProducts }: ProductListProps) {

    const { handleSubmit, setValue, control, formState: { errors }, reset } = useForm<ProductoFormData>({
        resolver: zodResolver(productoFormSchema)
    });

    const [modalVisible, setModalVisible] = useState(false);

    const onSubmit = async (data: ProductoFormData) => {
        try {
            await productService.createProduct({
                name: data.nombre,
                description: data.descripcion,
                status: "active",
                stock: data.stock,
                supplier_price: data.precio * 0.7, 
                public_price: data.precio,
                thumbnail: "",
                bar_code: "",
                minimal_safe_stock: 5,
                discount: 0,
                enterprise_id: 1, 
                category_id: Number(data.categoria[0]) || 1,
                supplier_id: 1 
            });
            
            setModalVisible(false);
            reset();
            Alert.alert('Éxito', 'Producto creado correctamente');
            refreshProducts();
        } catch (error) {
            console.error('Error al crear producto:', error);
            Alert.alert('Error', 'No se pudo crear el producto');
        }
    };

    const seleccionar = () => {
        setModalVisible(true);
    };

    return (
        <View className='h-full bg-black p-4'>
            <ScrollView>
                <View className="flex flex-row flex-wrap justify-between mb-2">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            href={`/dashboard/inventory/productDetails/${product.id}`}
                        />
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity
                className="absolute bottom-4 right-4 bg-white rounded-full p-4 mb-3"
                onPress={seleccionar}
            >
                <Text className="text-black font-semibold">➕ Agregar Producto</Text>
            </TouchableOpacity>
            <AddProductModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                errors={errors}
            />
        </View>
    );
} 