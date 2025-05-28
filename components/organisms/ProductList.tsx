import { View, ScrollView, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { ProductCard } from '../molecules/ProductCard';
import { AddProductModal } from '../molecules/AddProductModal';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoFormSchema, type ProductoFormData } from '../../validators/products';
import { productService } from '../../lib/products';
import { categoriesService, CategorieData } from '../../lib/categories';
import { Picker } from '@react-native-picker/picker';
import type { ImagePickerAsset } from 'expo-image-picker';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string | null;
}

interface ProductListProps {
    products: Product[];
    refreshProducts: () => Promise<void>;
}

export function ProductList({ products, refreshProducts }: ProductListProps) {
    const { control, formState: { errors }, reset, trigger } = useForm<ProductoFormData>({
        resolver: zodResolver(productoFormSchema)
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState<CategorieData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Función para cargar todos los productos
    const loadAllProducts = async () => {
        try {
            setIsLoading(true);
            const allProducts = await productService.getAllProducts();
            const formattedProducts = allProducts.map((product: any) => ({
                id: product.id.toString(),
                name: product.name,
                price: product.public_price,
                image: product.thumbnail
            }));
            setFilteredProducts(formattedProducts);
        } catch (error) {
            console.error('Error al cargar productos:', error);
            Alert.alert('Error', 'No se pudieron cargar los productos');
        } finally {
            setIsLoading(false);
        }
    };

    // Cargar categorías y productos al montar el componente
    useEffect(() => {
        const initializeData = async () => {
            try {
                // Cargar categorías
                const data = await categoriesService.getAllCategories();
                setCategories(data);
                
                // Cargar productos iniciales
                await loadAllProducts();
            } catch (error) {
                console.error('Error al inicializar datos:', error);
                Alert.alert('Error', 'No se pudieron cargar los datos iniciales');
            }
        };
        
        initializeData();
    }, []);

    const handleCategoryChange = async (categoryId: string) => {
        setSelectedCategory(categoryId);
        try {
            setIsLoading(true);
            if (!categoryId) {
                await loadAllProducts();
            } else {
                const categoryProducts = await productService.getProductsByCategory(Number(categoryId));
                const formattedProducts = categoryProducts.map((product: any) => ({
                    id: product.id.toString(),
                    name: product.name,
                    price: product.public_price,
                    image: product.thumbnail
                }));
                setFilteredProducts(formattedProducts);
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
            Alert.alert('Error', 'No se pudieron cargar los productos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (data: ProductoFormData & { image?: ImagePickerAsset }) => {
        try {
            const productData = {
                name: data.nombre,
                description: data.descripcion,
                status: "active" as const,
                stock: data.stock,
                supplier_price: Math.round(data.precio * 0.7),
                public_price: data.precio,
                thumbnail: "",
                bar_code: "",
                minimal_safe_stock: 5,
                discount: data.descuento || 0,
                enterprise_id: 1,
                category_id: Number(data.categoria[0]) || 1,
                supplier_id: Number(data.proveedor) || 1
            };

            console.log('Enviando datos del producto:', productData);

            let response;
            if (data.image) {
                // Crear producto con imagen
                response = await productService.createProductWithImage({
                    ...productData,
                    image: {
                        uri: Platform.OS === 'ios' ? data.image.uri.replace('file://', '') : data.image.uri,
                        type: data.image.mimeType || 'image/jpeg',
                        name: 'product_image.jpg'
                    }
                });
            } else {
                // Crear producto sin imagen
                response = await productService.createProduct(productData);
            }
            
            console.log('Respuesta del servidor:', response);
            
            setModalVisible(false);
            reset();
            Alert.alert('Éxito', 'Producto creado correctamente');
            
            // Recargar los productos según la categoría actual
            if (selectedCategory) {
                await handleCategoryChange(selectedCategory);
            } else {
                await loadAllProducts();
            }
        } catch (error: any) {
            console.error('Error al crear producto:', error.response?.data || error);
            Alert.alert(
                'Error',
                error.response?.data?.detail?.[0]?.msg || 
                error.response?.data?.message || 
                'No se pudo crear el producto. Por favor, verifica todos los campos.'
            );
        }
    };

    const seleccionar = () => {
        setModalVisible(true);
    };

    return (
        <View className='h-full bg-black p-4'>
            <View className="bg-zinc-800 rounded-2xl mb-4 px-2">
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={handleCategoryChange}
                    style={{ color: 'white' }}
                >
                    <Picker.Item label="Todas las categorías" value="" />
                    {categories.map((category) => (
                        <Picker.Item
                            key={category.id.toString()}
                            label={category.name}
                            value={category.id.toString()}
                        />
                    ))}
                </Picker>
            </View>

            <ScrollView>
                <View className="flex flex-row flex-wrap justify-between mb-2">
                    {isLoading ? (
                        <Text className="text-white text-center w-full">Cargando productos...</Text>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            href={`/dashboard/inventory/productDetails/${product.id}`}
                        />
                        ))
                    ) : (
                        <Text className="text-white text-center w-full">No hay productos disponibles</Text>
                    )}
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
                onSubmit={handleFormSubmit}
                control={control}
                errors={errors}
                trigger={trigger}
            />
        </View>
    );
} 