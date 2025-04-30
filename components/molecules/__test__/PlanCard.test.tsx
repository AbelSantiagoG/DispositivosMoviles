import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PlanCard } from '../PlanCard';

describe('PlanCard component', () => {
  const mockProps = {
    nombre: 'Plan Basic',
    descripcion: 'Ideal para pequeños negocios',
    precio: 29.99,
    onSelect: jest.fn()
  };

  it('renders with all provided props', () => {
    const { getByText } = render(<PlanCard {...mockProps} />);
    
    // Check that all text elements are rendered
    expect(getByText('Plan Basic')).toBeTruthy();
    expect(getByText('Ideal para pequeños negocios')).toBeTruthy();
    expect(getByText('$29.99')).toBeTruthy();
    expect(getByText('/mes')).toBeTruthy();
    expect(getByText('Seleccionar')).toBeTruthy();
  });

  it('formats price correctly', () => {
    const props = { ...mockProps, precio: 1000 };
    const { getByText } = render(<PlanCard {...props} />);
    
    expect(getByText('$1,000')).toBeTruthy();
  });

  it('calls onSelect when button is pressed', () => {
    const { getByText } = render(<PlanCard {...mockProps} />);
    
    // Find and press the select button
    const button = getByText('Seleccionar');
    fireEvent.press(button);
    
    expect(mockProps.onSelect).toHaveBeenCalledTimes(1);
  });
}); 