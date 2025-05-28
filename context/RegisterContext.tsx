import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

interface RegisterData {
  // User data
  employee_name: string;
  employee_lastname: string;
  employee_email: string;
  employee_phone: string;
  password: string;
  confirmPassword: string;
  
  // Enterprise data
  enterprise_name: string;
  nit: string;
  enterprise_email: string;
  enterprise_phone: string;
  city: string;
}

interface StepValidation {
  isValid: boolean;
  isVisited: boolean;
}

interface RegisterContextType {
  registerData: RegisterData;
  updateUserData: (data: Partial<RegisterData>) => void;
  updateEnterpriseData: (data: Partial<RegisterData>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearForm: () => void;
  stepValidation: {
    user: StepValidation;
    enterprise: StepValidation;
    payment: StepValidation;
  };
  setStepValidation: (step: keyof typeof initialStepValidation, validation: Partial<StepValidation>) => void;
}

const STORAGE_KEY = '@register_data';
const STEP_VALIDATION_KEY = '@step_validation';

const initialRegisterData: RegisterData = {
  employee_name: '',
  employee_lastname: '',
  employee_email: '',
  employee_phone: '',
  password: '',
  confirmPassword: '',
  enterprise_name: '',
  nit: '',
  enterprise_email: '',
  enterprise_phone: '',
  city: '',
};

const initialStepValidation = {
  user: { isValid: false, isVisited: false },
  enterprise: { isValid: false, isVisited: false },
  payment: { isValid: false, isVisited: false },
};

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [registerData, setRegisterData] = useState<RegisterData>(initialRegisterData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepValidation, setStepValidationState] = useState(initialStepValidation);

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setRegisterData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadSavedData();
  }, []);

  const updateUserData = (data: Partial<RegisterData>) => {
    const newData = { ...registerData, ...data };
    setRegisterData(newData);
    
    // Guardar en AsyncStorage
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
      .catch(error => {
        console.error('Error saving user data:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudieron guardar los datos',
          position: 'bottom',
        });
      });

    // Actualizar validación
    if (Object.keys(data).length > 0) {
      setStepValidation('user', { isVisited: true });
    }
  };

  const updateEnterpriseData = (data: Partial<RegisterData>) => {
    const newData = { ...registerData, ...data };
    setRegisterData(newData);
    
    // Guardar en AsyncStorage
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
      .catch(error => {
        console.error('Error saving enterprise data:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudieron guardar los datos',
          position: 'bottom',
        });
      });

    // Actualizar validación
    if (Object.keys(data).length > 0) {
      setStepValidation('enterprise', { isVisited: true });
    }
  };

  const clearForm = () => {
    setRegisterData(initialRegisterData);
    setStepValidationState(initialStepValidation);
    AsyncStorage.removeItem(STORAGE_KEY)
      .catch(error => console.error('Error clearing data:', error));
  };

  const setStepValidation = (
    step: keyof typeof initialStepValidation,
    validation: Partial<StepValidation>
  ) => {
    const newValidation = {
      ...stepValidation,
      [step]: { ...stepValidation[step], ...validation },
    };
    setStepValidationState(newValidation);
  };

  return (
    <RegisterContext.Provider value={{
      registerData,
      updateUserData,
      updateEnterpriseData,
      isLoading,
      setIsLoading,
      error,
      setError,
      clearForm,
      stepValidation,
      setStepValidation,
    }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error('useRegister must be used within a RegisterProvider');
  }
  return context;
} 