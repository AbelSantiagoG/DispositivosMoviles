import React from 'react';
import { render } from '@testing-library/react-native';
import { FormErrorMessage } from '../FormErrorMessage';

describe('FormErrorMessage', () => {
  it('renderiza el mensaje de error cuando se proporciona', () => {
    const errorMessage = 'Este campo es requerido';
    const { getByText } = render(<FormErrorMessage message={errorMessage} />);
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('no renderiza nada cuando no hay mensaje de error', () => {
    const { container } = render(<FormErrorMessage message="" />);
    expect(container.children.length).toBe(0);
  });

  it('renderiza con un estilo personalizado', () => {
    const errorMessage = 'Error personalizado';
    const customStyle = { color: 'red', fontSize: 16 };
    const { getByText } = render(
      <FormErrorMessage message={errorMessage} style={customStyle} />
    );
    const errorElement = getByText(errorMessage);
    expect(errorElement.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const errorMessage = 'Error con clase personalizada';
    const { getByText } = render(
      <FormErrorMessage message={errorMessage} className="custom-error" />
    );
    const errorElement = getByText(errorMessage);
    expect(errorElement.props.className).toContain('custom-error');
  });
});
