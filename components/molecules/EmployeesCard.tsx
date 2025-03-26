import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Link } from 'expo-router';

interface EmployeesCardProps {
    name: string;
    telephone: string;
    image: ImageSourcePropType;
    href: string;
}

export function EmployeesCard({ name, telephone, image, href }: EmployeesCardProps) {
    return (
        <View className="w-[48%] mb-9 items-center">
            <Link href={href} asChild>
                <TouchableOpacity className="items-center">
                    <View className="rounded-full mb-4 w-24 h-24">
                        <Image source={image} className="w-full h-full" />
                    </View>
                    <Text className="text-white font-semibold">{name}</Text>
                    <Text className="text-white text-sm">{telephone}</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}