import React from 'react';
import { render } from '@testing-library/react-native';
import { DashboardCard } from '../DashboardCard';
import { Text } from 'react-native';

// Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('DashboardCard component', () => {
  const mockIcon = <Text testID="mock-icon">Icon</Text>;

  it('renders correctly with required props', () => {
    const { getByText, getByTestId } = render(
      <DashboardCard 
        title="Test Title" 
        description="Test Description" 
        icon={mockIcon} 
      />
    );
    
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
    expect(getByTestId('mock-icon')).toBeTruthy();
  });

  it('renders with href link when provided', () => {
    const { getByText } = render(
      <DashboardCard 
        title="Test Title" 
        description="Test Description" 
        icon={mockIcon} 
        href="/test-route"
      />
    );
    
    // Since we're mocking Link, we're just verifying the content renders
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
  });
}); 