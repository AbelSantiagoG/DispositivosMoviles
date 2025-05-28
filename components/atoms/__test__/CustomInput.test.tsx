import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomInput } from '../CustomInput';
import { Control, useForm } from 'react-hook-form';

// Mock de react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  Control: jest.fn(),
}));

describe('CustomInput', () => {
  const mockControl = {} as Control;
  const mockName = 'testInput';
  const mockLabel = 'Test Label';
  const mockPlaceholder = 'Test Placeholder';

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      control: mockControl,
      formState: { errors: {} },
    });
  });

  it('renderiza correctamente con las props básicas', () => {
    const { getByText, getByPlaceholderText } = render(
      <CustomInput
        control={mockControl}
        name={mockName}
        label={mockLabel}
        placeholder={mockPlaceholder}
      />
    );

    expect(getByText(mockLabel)).toBeTruthy();
    expect(getByPlaceholderText(mockPlaceholder)).toBeTruthy();
  });

  it('renderiza con un valor por defecto', () => {
    const defaultValue = 'Default Value';
    const { getByDisplayValue } = render(
      <CustomInput
        control={mockControl}
        name={mockName}
        label={mockLabel}
        defaultValue={defaultValue}
      />
    );

    expect(getByDisplayValue(defaultValue)).toBeTruthy();
  });

  it('renderiza con un mensaje de error', () => {
    const errorMessage = 'Este campo es requerido';
    const { getByText } = render(
      <CustomInput
        control={mockControl}
        name={mockName}
        label={mockLabel}
        error={errorMessage}
      />
    );

    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('maneja el cambio de texto correctamente', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomInput
        control={mockControl}
        name={mockName}
        label={mockLabel}
        placeholder={mockPlaceholder}
        onChangeText={onChangeText}
      />
    );

    const input = getByPlaceholderText(mockPlaceholder);
    fireEvent.changeText(input, 'Nuevo texto');
    expect(onChangeText).toHaveBeenCalledWith('Nuevo texto');
  });

  it('renderiza con un ícono cuando se proporciona', () => {
    const { getByTestId } = render(
      <CustomInput
        control={mockControl}
        name={mockName}
        label={mockLabel}
        icon="user"
      />
    );

    expect(getByTestId('input-icon')).toBeTruthy();
  });

  it('renderiza como deshabilitado cuando se proporciona la prop disabled', () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        control={mockControl}
        name={mockName}
        label={mockLabel}
        placeholder={mockPlaceholder}
        disabled
      />
    );

    const input = getByPlaceholderText(mockPlaceholder);
    expect(input.props.editable).toBe(false);
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <CustomInput
        control={mockControl}
        name={mockName}
        label={mockLabel}
        style={customStyle}
      />
    );

    const container = getByTestId('input-container');
    expect(container.props.style).toMatchObject(customStyle);
  });
});
