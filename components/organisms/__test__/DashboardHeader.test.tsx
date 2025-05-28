import React from 'react';
import { render } from '@testing-library/react-native';
import { DashboardHeader } from '../DashboardHeader';

describe('DashboardHeader', () => {
  it('renderiza el header', () => {
    const { getByText } = render(<DashboardHeader />);
    expect(getByText(/logo/i)).toBeTruthy();
  });
}); 