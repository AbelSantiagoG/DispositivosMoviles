import { View, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { empresaFormSchema, type EmpresaFormData } from '../../validators/register';
import { router } from 'expo-router';
import { pageContainer } from '../../components/Tokens';
import { CustomInput } from '../../components/atoms/CustomInput';
import { Button } from '../../components/atoms/Button';
import { ProgressSteps } from '../../components/molecules/ProgressSteps';

export default function RegisterEmpresa() {
    const { control, handleSubmit, formState: { errors } } = useForm<EmpresaFormData>({
        resolver: zodResolver(empresaFormSchema)
    });

    const onSubmit = (data: EmpresaFormData) => {
        console.log(data);
        router.push('/register/plan');
    };

    return (
        <ScrollView className={pageContainer}>
            <ProgressSteps currentStep={2} />

            <View>
                <CustomInput
                    control={control}
                    name="nit"
                    label="NIT"
                    placeholder="NIT"
                    keyboardType="numeric"
                    error={errors.nit?.message}
                />

                <CustomInput
                    control={control}
                    name="nombre"
                    label="Nombre de la Empresa"
                    placeholder="Nombre de la Empresa"
                    error={errors.nombre?.message}
                />

                <CustomInput
                    control={control}
                    name="email"
                    label="Email"
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email?.message}
                />

                <CustomInput
                    control={control}
                    name="telefono"
                    label="Teléfono"
                    placeholder="Teléfono"
                    keyboardType="phone-pad"
                    error={errors.telefono?.message}
                />

                <CustomInput
                    control={control}
                    name="ciudad"
                    label="Ciudad"
                    placeholder="Ciudad"
                    error={errors.ciudad?.message}
                />

                <Button
                    title="Continuar"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </ScrollView>
    );
} 