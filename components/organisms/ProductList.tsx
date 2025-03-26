import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { ProductCard } from '../molecules/ProductCard';
import { AddProductModal } from '../molecules/AddProductModal';
import { useState } from 'react';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoFormSchema, type ProductoFormData } from '../../validators/register';

interface Product {
    id: string;
    name: string;
    price: number;
    image: any;
}

interface ProductListProps {
    products: Product[];
}

export function ProductList({ products }: ProductListProps) {

    const { handleSubmit, setValue, control, formState: { errors } } = useForm<ProductoFormData>({
        resolver: zodResolver(productoFormSchema)
    });

    const [modalVisible, setModalVisible] = useState(false);

    const onSubmit = (data: ProductoFormData) => {
        console.log(data);
        setModalVisible(false);
        alert('Pago exitoso');
        router.replace('/login');
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