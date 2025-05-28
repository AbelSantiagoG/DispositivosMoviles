import React from 'react';
import { render } from '@testing-library/react-native';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('renderiza el logo correctamente', () => {
    const { getByTestId } = render(<Logo />);
    const logo = getByTestId('logo-image');
    expect(logo).toBeTruthy();
    expect(logo.props.style).toMatchObject({
      width: 200,
      height: 200
    });
  });

  it('renderiza el logo con una clase personalizada', () => {
    const { getByTestId } = render(<Logo className="custom-class" />);
    const logo = getByTestId('logo-image');
    expect(logo).toBeTruthy();
    expect(logo.props.className).toContain('custom-class');
  });

  it('renderiza el logo con un estilo personalizado', () => {
    const customStyle = { width: 150, height: 150 };
    const { getByTestId } = render(<Logo style={customStyle} />);
    const logo = getByTestId('logo-image');
    expect(logo).toBeTruthy();
    expect(logo.props.style).toMatchObject(customStyle);
  });
}); 