import React from 'react';
import { render } from '@testing-library/react-native';
import { ProductCard } from '../ProductCard';

// Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('ProductCard component', () => {
  const mockProps = {
    name: 'Test Product',
    price: 19.99,
    image: { uri: 'https://example.com/image.jpg' },
    href: '/products/123'
  };

  it('renders with all provided props', () => {
    const { getByText } = render(<ProductCard {...mockProps} />);
    
    // Check that all text elements are rendered
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$19.99')).toBeTruthy();
  });

  it('formats price with 2 decimal places', () => {
    const props = { ...mockProps, price: 20 };
    const { getByText } = render(<ProductCard {...props} />);
    
    expect(getByText('$20.00')).toBeTruthy();
  });

  it('formats price with 2 decimal places for non-integer values', () => {
    const props = { ...mockProps, price: 20.5 };
    const { getByText } = render(<ProductCard {...props} />);
    
    expect(getByText('$20.50')).toBeTruthy();
  });
}); 