import { View, ScrollView } from 'react-native';
import { EmpresaFormData } from '../../validators/register';
import { router } from 'expo-router';
import { pageContainer } from '../../components/Tokens';
import { EmpresaRegisterForm } from '../../components/organisms/RegisterForm';
import { useRegister } from '../../context/RegisterContext';
import { Button } from '../../components/atoms/Button';
import Toast from 'react-native-toast-message';

export default function RegisterEmpresa() {
    const { updateEnterpriseData, clearForm, setStepValidation } = useRegister();

    const onSubmit = (data: EmpresaFormData) => {
        updateEnterpriseData(data);
        setStepValidation('enterprise', { isValid: true, isVisited: true });
        Toast.show({
            type: 'success',
            text1: 'Datos guardados',
            text2: 'Los datos de la empresa han sido guardados correctamente',
            position: 'bottom',
        });
        router.push('/register/plan');
    };

    const handleClearForm = () => {
        clearForm();
    };

    return (
        <ScrollView className={pageContainer}>
            <View className="flex-1">
                <EmpresaRegisterForm onSubmit={onSubmit} />
            </View>
        </ScrollView>
    );
} 