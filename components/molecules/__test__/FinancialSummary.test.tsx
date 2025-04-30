import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FinancialSummary } from '../FinancialSummary';

// Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('FinancialSummary component', () => {
  it('renders correctly with the provided amount', () => {
    const { getByText } = render(<FinancialSummary amount={1000} />);
    
    // Title and section header
    expect(getByText('Resumen Financiero')).toBeTruthy();
    expect(getByText('Ganancias')).toBeTruthy();
    
    // Formatted amount
    expect(getByText('$1,000')).toBeTruthy();
    
    // Action button
    expect(getByText('Administrar')).toBeTruthy();
  });

  it('formats large numbers correctly', () => {
    const { getByText } = render(<FinancialSummary amount={1000000} />);
    
    // Formatted large amount
    expect(getByText('$1,000,000')).toBeTruthy();
  });

  it('handles zero amount', () => {
    const { getByText } = render(<FinancialSummary amount={0} />);
    
    // Zero amount
    expect(getByText('$0')).toBeTruthy();
  });
}); 