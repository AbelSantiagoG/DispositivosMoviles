import React from 'react';
import { render } from '@testing-library/react-native';
import { SuppliersCard } from '../SuppliersCard';

// Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('SuppliersCard component', () => {
  const mockProps = {
    name: 'Supplier Name',
    telephone: '555-123-4567',
    image: { uri: 'https://example.com/supplier.jpg' },
    href: '/suppliers/123'
  };

  it('renders with all provided props', () => {
    const { getByText } = render(<SuppliersCard {...mockProps} />);
    
    // Check that all text elements are rendered
    expect(getByText('Supplier Name')).toBeTruthy();
    expect(getByText('555-123-4567')).toBeTruthy();
  });

  it('renders with a different supplier name', () => {
    const props = { ...mockProps, name: 'Another Supplier' };
    const { getByText } = render(<SuppliersCard {...props} />);
    
    expect(getByText('Another Supplier')).toBeTruthy();
  });

  it('renders with a different telephone number', () => {
    const props = { ...mockProps, telephone: '888-999-0000' };
    const { getByText } = render(<SuppliersCard {...props} />);
    
    expect(getByText('888-999-0000')).toBeTruthy();
  });
}); 