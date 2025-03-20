import { DashboardLayout } from '../../components/organisms/DashboardLayout';
import { AuthProvider } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';
import "../../global.css";

const DashboardLayoutScreen = () => {
    const { user, setUser } = useAuth();
    return (
        <AuthProvider>
            <DashboardLayout />
        </AuthProvider>
    );
};

export default DashboardLayoutScreen;




