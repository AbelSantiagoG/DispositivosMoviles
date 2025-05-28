import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renderiza correctamente con el texto proporcionado', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<Button text={buttonText} onPress={() => {}} />);
    expect(getByText(buttonText)).toBeTruthy();
  });

  it('maneja el evento onPress correctamente', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button text="Click me" onPress={onPressMock} />);
    
    fireEvent.press(getByText('Click me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renderiza como deshabilitado cuando se proporciona la prop disabled', () => {
    const { getByText } = render(
      <Button text="Click me" onPress={() => {}} disabled />
    );
    
    const button = getByText('Click me');
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Button text="Click me" onPress={() => {}} style={customStyle} />
    );
    
    const button = getByTestId('button-container');
    expect(button.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = render(
      <Button text="Click me" onPress={() => {}} className="custom-button" />
    );
    
    const button = getByTestId('button-container');
    expect(button.props.className).toContain('custom-button');
  });

  it('renderiza con un ícono cuando se proporciona', () => {
    const { getByTestId } = render(
      <Button text="Click me" onPress={() => {}} icon="user" />
    );
    
    expect(getByTestId('button-icon')).toBeTruthy();
  });

  it('renderiza con un tamaño personalizado', () => {
    const { getByTestId } = render(
      <Button text="Click me" onPress={() => {}} size="large" />
    );
    
    const button = getByTestId('button-container');
    expect(button.props.className).toContain('large');
  });
});
