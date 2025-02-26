import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, type UserFormData } from '../../validators/register';
import { router } from 'expo-router';
import { MainLayout } from '../../components/organisms/MainLayout';
import { RegisterForm } from '../../components/organisms/RegisterForm';

export default function RegisterUser() {
    const { control, handleSubmit, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema)
    });

    const onSubmit = (data: UserFormData) => {
        console.log(data);
        router.push('/register/empresa');
    };

    return (
        <MainLayout showBackButton>
            <RegisterForm
                formType="user"
                onSubmit={onSubmit}
            />
        </MainLayout>
    );
}