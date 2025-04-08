import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { DashboardHeader } from './DashboardHeader';
import { DashboardTabBar } from './DashboardTabBar';
import { safeAreaContainer } from '../Tokens';


export function DashboardLayout() {
    return (
        <SafeAreaView className={safeAreaContainer} style={{ paddingTop: 0 }}>
            <DashboardHeader/>
            <View className="flex-1">
                <DashboardTabBar />
            </View>
        </SafeAreaView>
    );
} 