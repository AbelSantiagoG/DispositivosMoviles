import React from 'react';
import { render } from '@testing-library/react-native';
import FormErrorMessage from '../FormErrorMessage';

describe('FormErrorMessage component', () => {
  it('renders correctly with an error message', () => {
    const { getByText } = render(<FormErrorMessage message="This is an error" />);
    
    const errorMessage = getByText('This is an error');
    expect(errorMessage).toBeTruthy();
  });

  it('does not render when no message is provided', () => {
    const { toJSON } = render(<FormErrorMessage />);
    
    // The component returns null when no message is provided
    expect(toJSON()).toBeNull();
  });

  it('shows the error icon', () => {
    const { getByText } = render(<FormErrorMessage message="Error message" />);
    
    const errorIcon = getByText('❗');
    expect(errorIcon).toBeTruthy();
  });
});
