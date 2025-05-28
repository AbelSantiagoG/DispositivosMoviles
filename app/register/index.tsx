import { View } from 'react-native';
import { UserFormData } from '../../validators/register';
import { router } from 'expo-router';
import { MainLayout } from '../../components/organisms/MainLayout';
import { UserRegisterForm } from '../../components/organisms/RegisterForm';
import { useRegister } from '../../context/RegisterContext';
import { Button } from '../../components/atoms/Button';
import Toast from 'react-native-toast-message';

export default function RegisterUser() {
    const { updateUserData, clearForm, setStepValidation } = useRegister();

    const onSubmit = (data: UserFormData) => {
        updateUserData(data);
        setStepValidation('user', { isValid: true, isVisited: true });
        Toast.show({
            type: 'success',
            text1: 'Datos guardados',
            text2: 'Los datos del usuario han sido guardados correctamente',
            position: 'bottom',
        });
        router.push('/register/empresa');
    };

    const handleClearForm = () => {
        clearForm();
    };

    return (
        <MainLayout showBackButton>
            <View className="flex-1">
                <UserRegisterForm onSubmit={onSubmit} />
            </View>
        </MainLayout>
    );
}