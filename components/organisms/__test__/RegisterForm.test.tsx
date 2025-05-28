import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UserRegisterForm, EmpresaRegisterForm } from '../RegisterForm';
import { useRegister } from '../../../context/RegisterContext';
import Toast from 'react-native-toast-message';

// Mock de react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

// Mock del contexto de registro
jest.mock('../../../context/RegisterContext', () => ({
  useRegister: jest.fn(),
}));

// Mock de react-native-toast-message
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

// Mock de los componentes hijos
jest.mock('../../atoms/CustomInput', () => ({
  CustomInput: ({ control, name, label, placeholder, error, onPress }) => (
    <div data-testid={`input-${name}`}>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        data-testid={`input-field-${name}`}
        onChange={(e) => control?.onChange(e.target.value)}
      />
      {error && <div data-testid={`error-${name}`}>{error}</div>}
    </div>
  ),
}));

jest.mock('../../atoms/Button', () => ({
  Button: ({ title, onPress }) => (
    <button data-testid="submit-button" onClick={onPress}>
      {title}
    </button>
  ),
}));

jest.mock('../../molecules/ProgressSteps', () => ({
  ProgressSteps: ({ currentStep }) => (
    <div data-testid="progress-steps">Step {currentStep}</div>
  ),
}));

describe('UserRegisterForm', () => {
  const mockRegisterData = {
    employee_name: '',
    employee_lastname: '',
    employee_email: '',
    employee_phone: '',
    password: '',
    confirmPassword: '',
  };

  const mockOnSubmit = jest.fn();
  const mockHandleSubmit = jest.fn((onSubmit) => onSubmit);
  const mockSetValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRegister as jest.Mock).mockReturnValue({
      registerData: mockRegisterData,
    });
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: mockHandleSubmit,
      formState: { errors: {} },
    });
  });

  it('renderiza correctamente el formulario de usuario', () => {
    const { getByTestId } = render(<UserRegisterForm onSubmit={mockOnSubmit} />);
    
    expect(getByTestId('progress-steps')).toBeTruthy();
    expect(getByTestId('input-employee_name')).toBeTruthy();
    expect(getByTestId('input-employee_lastname')).toBeTruthy();
    expect(getByTestId('input-employee_email')).toBeTruthy();
    expect(getByTestId('input-employee_phone')).toBeTruthy();
    expect(getByTestId('input-password')).toBeTruthy();
    expect(getByTestId('input-confirmPassword')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
  });

  it('maneja el envío del formulario correctamente', () => {
    const { getByTestId } = render(<UserRegisterForm onSubmit={mockOnSubmit} />);
    
    const submitButton = getByTestId('submit-button');
    fireEvent.press(submitButton);
    
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('muestra errores de validación', () => {
    const mockErrors = {
      employee_name: { message: 'El nombre es requerido' },
    };
    
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: mockHandleSubmit,
      formState: { errors: mockErrors },
    });

    const { getByTestId } = render(<UserRegisterForm onSubmit={mockOnSubmit} />);
    
    expect(getByTestId('error-employee_name')).toBeTruthy();
  });
});

describe('EmpresaRegisterForm', () => {
  const mockRegisterData = {
    enterprise_name: '',
    nit: '',
    enterprise_email: '',
    enterprise_phone: '',
    city: '',
  };

  const mockOnSubmit = jest.fn();
  const mockHandleSubmit = jest.fn((onSubmit) => onSubmit);

  beforeEach(() => {
    jest.clearAllMocks();
    (useRegister as jest.Mock).mockReturnValue({
      registerData: mockRegisterData,
    });
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: mockHandleSubmit,
      formState: { errors: {} },
    });
  });

  it('renderiza correctamente el formulario de empresa', () => {
    const { getByTestId } = render(<EmpresaRegisterForm onSubmit={mockOnSubmit} />);
    
    expect(getByTestId('progress-steps')).toBeTruthy();
    expect(getByTestId('input-enterprise_name')).toBeTruthy();
    expect(getByTestId('input-nit')).toBeTruthy();
    expect(getByTestId('input-enterprise_email')).toBeTruthy();
    expect(getByTestId('input-enterprise_phone')).toBeTruthy();
    expect(getByTestId('input-city')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
  });

  it('maneja el envío del formulario correctamente', () => {
    const { getByTestId } = render(<EmpresaRegisterForm onSubmit={mockOnSubmit} />);
    
    const submitButton = getByTestId('submit-button');
    fireEvent.press(submitButton);
    
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('muestra errores de validación', () => {
    const mockErrors = {
      enterprise_name: { message: 'El nombre de la empresa es requerido' },
    };
    
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: mockHandleSubmit,
      formState: { errors: mockErrors },
    });

    const { getByTestId } = render(<EmpresaRegisterForm onSubmit={mockOnSubmit} />);
    
    expect(getByTestId('error-enterprise_name')).toBeTruthy();
  });

  it('muestra toast de error cuando hay errores de validación', () => {
    const mockErrors = {
      enterprise_name: { message: 'El nombre de la empresa es requerido' },
    };
    
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: (onSubmit, onError) => onError(mockErrors),
      formState: { errors: mockErrors },
    });

    render(<EmpresaRegisterForm onSubmit={mockOnSubmit} />);
    
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error de validación',
      text2: 'El nombre de la empresa es requerido',
      position: 'bottom',
      visibilityTime: 3000,
    });
  });
}); 