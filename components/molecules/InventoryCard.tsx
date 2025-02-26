import { TouchableOpacity, Text, View } from 'react-native';
import { Link } from 'expo-router';

interface InventoryCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    fullWidth?: boolean;
}

export function InventoryCard({ title, description, icon, href, fullWidth = false }: InventoryCardProps) {
    return (
        <Link href={href} asChild>
            <TouchableOpacity className={`${fullWidth ? 'w-full' : 'w-[48%]'} bg-neutral-800 p-4 rounded-2xl mb-4`}>
                {icon}
                <Text className="text-white font-semibold mt-2">{title}</Text>
                <Text className="text-gray-400 text-sm">{description}</Text>
            </TouchableOpacity>
        </Link>
    );
} 