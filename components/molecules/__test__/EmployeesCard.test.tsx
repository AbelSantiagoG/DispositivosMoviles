import React from 'react';
import { render } from '@testing-library/react-native';
import { EmployeesCard } from '../EmployeesCard';

// Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('EmployeesCard component', () => {
  const mockProps = {
    name: 'Employee Name',
    telephone: '555-123-4567',
    image: { uri: 'https://example.com/employee.jpg' },
    href: '/employees/123'
  };

  it('renders with all provided props', () => {
    const { getByText } = render(<EmployeesCard {...mockProps} />);
    
    // Check that all text elements are rendered
    expect(getByText('Employee Name')).toBeTruthy();
    expect(getByText('555-123-4567')).toBeTruthy();
  });

  it('renders with a different employee name', () => {
    const props = { ...mockProps, name: 'Another Employee' };
    const { getByText } = render(<EmployeesCard {...props} />);
    
    expect(getByText('Another Employee')).toBeTruthy();
  });

  it('renders with a different telephone number', () => {
    const props = { ...mockProps, telephone: '888-999-0000' };
    const { getByText } = render(<EmployeesCard {...props} />);
    
    expect(getByText('888-999-0000')).toBeTruthy();
  });
}); 