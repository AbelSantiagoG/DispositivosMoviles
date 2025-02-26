import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { ProductCard } from '../molecules/ProductCard';

interface Product {
    id: string;
    name: string;
    price: number;
    image: any;
}

interface ProductListProps {
    products: Product[];
    onAddProduct: () => void;
}

export function ProductList({ products, onAddProduct }: ProductListProps) {
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
                onPress={onAddProduct}
            >
                <Text className="text-black font-semibold">➕ Agregar Producto</Text>
            </TouchableOpacity>
        </View>
    );
} 