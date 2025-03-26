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
        <Link href={href} asChild>
            <TouchableOpacity className="w-[48%] mb-9">
                <View className="bg-neutral-800 rounded-2xl mb-4">
                    <View>
                        <Image source={image} className="w-full" />
                    </View>
                </View>
                <Text className="text-white font-semibold">{name}</Text>
                <Text className="text-white text-sm">{telephone}</Text>
            </TouchableOpacity>
        </Link>
    );
}