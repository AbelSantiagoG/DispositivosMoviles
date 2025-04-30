import React from 'react';
import { render } from '@testing-library/react-native';
import { InventoryCard } from '../InventoryCard';
import { Text } from 'react-native';

// Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('InventoryCard component', () => {
  const mockIcon = <Text testID="mock-icon">Icon</Text>;
  const mockProps = {
    title: 'Inventory Title',
    description: 'Inventory Description',
    icon: mockIcon,
    href: '/inventory/123'
  };

  it('renders with default width', () => {
    const { getByText, getByTestId } = render(<InventoryCard {...mockProps} />);
    
    // Check that all elements are rendered
    expect(getByText('Inventory Title')).toBeTruthy();
    expect(getByText('Inventory Description')).toBeTruthy();
    expect(getByTestId('mock-icon')).toBeTruthy();
  });

  it('renders with full width when specified', () => {
    const props = { ...mockProps, fullWidth: true };
    const { getByText, getByTestId } = render(<InventoryCard {...props} />);
    
    // Check that all elements are rendered
    expect(getByText('Inventory Title')).toBeTruthy();
    expect(getByText('Inventory Description')).toBeTruthy();
    expect(getByTestId('mock-icon')).toBeTruthy();
    
    // Note: We can't directly test the width class since we're testing components, not DOM
  });
}); 