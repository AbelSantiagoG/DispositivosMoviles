import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button component', () => {
  it('renders correctly with primary variant', () => {
    const { getByText } = render(<Button title="Primary Button" />);
    
    const buttonText = getByText('Primary Button');
    expect(buttonText).toBeTruthy();
  });

  it('renders correctly with secondary variant', () => {
    const { getByText } = render(<Button title="Secondary Button" variant="secondary" />);
    
    const buttonText = getByText('Secondary Button');
    expect(buttonText).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Click Me" onPress={onPressMock} />);
    
    const button = getByText('Click Me');
    fireEvent.press(button);
    
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
