import { View, ScrollView, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeAreaContainer, pageContainer } from '../Tokens';

interface MainLayoutProps extends ViewProps {
    children: React.ReactNode;
    showBackButton?: boolean;
    showProfileButton?: boolean;
    onProfilePress?: () => void;
    scrollable?: boolean;
}

export function MainLayout({ 
    children, 
    showBackButton,
    showProfileButton,
    onProfilePress,
    scrollable = true,
    ...props 
}: MainLayoutProps) {
    const Content = scrollable ? ScrollView : View;

    return (
        <SafeAreaView className={safeAreaContainer}>
            
            <Content 
                className={pageContainer}
                {...props}
            >
                {children}
            </Content>
        </SafeAreaView>
    );
} 