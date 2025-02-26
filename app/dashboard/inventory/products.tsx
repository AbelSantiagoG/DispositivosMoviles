import { View } from 'react-native';
import { useRouter } from "expo-router";
import { ProductList } from '../../../components/organisms/ProductList';

const Products = () => {
    const router = useRouter();

    const mockProducts = [
        {
            id: '1',
            name: 'Coca-Cola',
            price: 1.50,
            image: require('../../../assets/product.png')
        },
        {
            id: '2',
            name: 'Coca-Cola',
            price: 1.50,
            image: require('../../../assets/product.png')
        },
        {
            id: '3',
            name: 'Coca-Cola',
            price: 1.50,
            image: require('../../../assets/product.png')
        },
        {
            id: '4',
            name: 'Coca-Cola',
            price: 1.50,
            image: require('../../../assets/product.png')
        }
    ];

    const handleAddProduct = () => {
        // Aquí iría la lógica para agregar un nuevo producto
        console.log('Agregar nuevo producto');
    };

    return (
        <ProductList 
            products={mockProducts}
            onAddProduct={handleAddProduct}
        />
    );
};

export default Products;