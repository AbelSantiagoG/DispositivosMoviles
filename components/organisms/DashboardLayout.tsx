import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { DashboardHeader } from './DashboardHeader';
import { DashboardTabBar } from './DashboardTabBar';
import { safeAreaContainer } from '../Tokens';

interface DashboardLayoutProps {
    userInfo?: string | null;
    children?: React.ReactNode;
}

export function DashboardLayout({ userInfo, children }: DashboardLayoutProps) {
    return (
        <SafeAreaView className={safeAreaContainer}>
            <DashboardHeader userInfo={userInfo} />
            <View className="flex-1">
                {children}
                <DashboardTabBar />
            </View>
        </SafeAreaView>
    );
} 