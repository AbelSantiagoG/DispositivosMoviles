import { View, Text, TouchableOpacity, Image, ImageSourcePropType, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { useProductService } from '../../lib/products';

interface ProductCardProps {
    name: string;
    price: number;
    image: string | null;
    href: string;
}

export function ProductCard({ name, price, image, href }: ProductCardProps) {
    const windowWidth = Dimensions.get('window').width;
    const cardWidth = (windowWidth - 32) / 2; // 32 es el padding total horizontal (16 * 2)
    const imageHeight = cardWidth; // Mantener proporción cuadrada
    const productService = useProductService();

    return (
        <Link href={href} asChild>
            <TouchableOpacity style={{ width: cardWidth }} className='mb-9'>
                <View className="bg-neutral-800 rounded-2xl mb-4 overflow-hidden">
                    <Image 
                        source={productService.getImageUrl(image)}
                        style={{ width: cardWidth, height: imageHeight }}
                        resizeMode="cover"
                    />
                </View>
                <Text className="text-white font-semibold">{name}</Text>
                <Text className="text-white text-sm">${price.toFixed(2)}</Text>
            </TouchableOpacity>
        </Link>
    );
} 