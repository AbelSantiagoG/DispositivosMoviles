import { TouchableOpacity, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

interface DashboardCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href?: string;
}

export function DashboardCard({ title, description, icon, href }: DashboardCardProps) {
    const Card = (
        <TouchableOpacity className="w-[48%] bg-neutral-800 p-4 rounded-2xl mb-4">
            {icon}
            <Text className="text-white font-semibold mt-2">{title}</Text>
            <Text className="text-gray-400 text-sm">{description}</Text>
        </TouchableOpacity>
    );

    if (href) {
        return (
            <Link href={href} asChild>
                {Card}
            </Link>
        );
    }

    return Card;
} 