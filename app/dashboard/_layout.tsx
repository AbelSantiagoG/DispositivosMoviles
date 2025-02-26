import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DashboardLayout } from '../../components/organisms/DashboardLayout';

import "../../global.css";

const DashboardLayoutScreen = () => {
    const [userPassword, setUserPassword] = useState<string | null>(null);

    const getInfoUser = async () => {
        try {
            const infoUser = await AsyncStorage.getItem('@infologin');
            if (infoUser) {
                const parsedInfo = JSON.parse(infoUser);
                setUserPassword(parsedInfo.password); 
            }
        } catch (error) {
            console.log('Error al obtener la información del usuario:', error);
        }
    };

    useEffect(() => {
        getInfoUser();
    }, []);

    return (
        <DashboardLayout userInfo={userPassword} />
    );
};

export default DashboardLayoutScreen;




