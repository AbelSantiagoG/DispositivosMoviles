import { View, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput } from '../atoms/CustomInput';
import { Button } from '../atoms/Button';
import { ProgressSteps } from '../molecules/ProgressSteps';
import { UserFormData, userFormSchema, EmpresaFormData, empresaFormSchema } from '../../validators/register';
import { useRegister } from '../../context/RegisterContext';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface UserFormProps {
    onSubmit: (data: UserFormData) => void;
}

interface EmpresaFormProps {
    onSubmit: (data: EmpresaFormData) => void;
}

export function UserRegisterForm({ onSubmit }: UserFormProps) {
    const { registerData } = useRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { control, handleSubmit, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            employee_name: registerData.employee_name,
            employee_lastname: registerData.employee_lastname,
            employee_email: registerData.employee_email,
            employee_phone: registerData.employee_phone,
            password: registerData.password,
            confirmPassword: registerData.confirmPassword,
        }
    });

    const handleError = (errors: any) => {
        const firstError = Object.values(errors)[0] as { message?: string };
        if (firstError?.message) {
            Toast.show({
                type: 'error',
                text1: 'Error de validación',
                text2: firstError.message,
                position: 'bottom',
                visibilityTime: 3000,
            });
        }
    };

    return (
        <View>
            <ProgressSteps currentStep={1} />
            <View>
                <CustomInput
                    control={control}
                    name="employee_name"
                    label="Nombre"
                    placeholder="Nombre"
                    error={errors.employee_name?.message}
                    maxLength={20}
                />
                <CustomInput
                    control={control}
                    name="employee_lastname"
                    label="Apellido"
                    placeholder="Apellido"
                    error={errors.employee_lastname?.message}
                    maxLength={20}
                />
                <CustomInput
                    control={control}
                    name="employee_email"
                    label="Email"
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.employee_email?.message}
                    maxLength={50}
                />
                <CustomInput
                    control={control}
                    name="employee_phone"
                    label="Teléfono"
                    placeholder="Teléfono"
                    keyboardType="phone-pad"
                    error={errors.employee_phone?.message}
                    maxLength={15}
                />
                <View style={{ position: 'relative' }}>
                    <CustomInput
                        control={control}
                        name="password"
                        label="Contraseña"
                        placeholder="Contraseña"
                        secureTextEntry={!showPassword}
                        error={errors.password?.message}
                        maxLength={20}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 40,
                            top: '60%',
                            zIndex: 1
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'relative' }}>
                    <CustomInput
                        control={control}
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        placeholder="Confirmar Contraseña"
                        secureTextEntry={!showConfirmPassword}
                        error={errors.confirmPassword?.message}
                        maxLength={50}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 40,
                            top: '60%',
                            zIndex: 1
                        }}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Ionicons
                            name={showConfirmPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>
                <Button
                    title="Continuar"
                    onPress={handleSubmit(onSubmit, handleError)}
                />
            </View>
        </View>
    );
}

export function EmpresaRegisterForm({ onSubmit }: EmpresaFormProps) {
    const { registerData } = useRegister();
    
    const { control, handleSubmit, formState: { errors } } = useForm<EmpresaFormData>({
        resolver: zodResolver(empresaFormSchema),
        defaultValues: {
            enterprise_name: registerData.enterprise_name,
            nit: registerData.nit,
            enterprise_email: registerData.enterprise_email,
            enterprise_phone: registerData.enterprise_phone,
            city: registerData.city,
        }
    });

    const handleError = (errors: any) => {
        const firstError = Object.values(errors)[0] as { message?: string };
        if (firstError?.message) {
            Toast.show({
                type: 'error',
                text1: 'Error de validación',
                text2: firstError.message,
                position: 'bottom',
                visibilityTime: 3000,
            });
        }
    };

    return (
        <View>
            <ProgressSteps currentStep={2} />
            <View>
                <CustomInput
                    control={control}
                    name="enterprise_name"
                    label="Nombre de la Empresa"
                    placeholder="Nombre de la Empresa"
                    error={errors.enterprise_name?.message}
                    maxLength={20}
                />
                <CustomInput
                    control={control}
                    name="nit"
                    label="NIT"
                    placeholder="NIT"
                    keyboardType="numeric"
                    error={errors.nit?.message}
                    maxLength={15}
                />
                <CustomInput
                    control={control}
                    name="enterprise_email"
                    label="Email de la Empresa"
                    placeholder="Email de la Empresa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.enterprise_email?.message}
                    maxLength={50}
                />
                <CustomInput
                    control={control}
                    name="enterprise_phone"
                    label="Teléfono de la Empresa"
                    placeholder="Teléfono de la Empresa"
                    keyboardType="phone-pad"
                    error={errors.enterprise_phone?.message}
                    maxLength={15}
                />
                <CustomInput
                    control={control}
                    name="city"
                    label="Ciudad"
                    placeholder="Ciudad"
                    error={errors.city?.message}
                    maxLength={50}
                />
                <Button
                    title="Continuar"
                    onPress={handleSubmit(onSubmit, handleError)}
                />
            </View>
        </View>
    );
} 