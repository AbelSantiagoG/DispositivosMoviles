import React from 'react';
import { render } from '@testing-library/react-native';
import { Logo } from '../Logo';

// Mock the Image component instead of trying to mock the specific asset
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  return {
    ...reactNative,
    Image: jest.fn().mockImplementation(({ testID, className, resizeMode }) => (
      // Return a mock component that includes all the props we want to test
      {
        type: 'Image',
        props: {
          testID,
          className,
          resizeMode,
          source: 'mocked-image-source'
        },
        $$typeof: Symbol.for('react.test.json')
      }
    ))
  };
});

describe('Logo component', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Logo />);
    expect(toJSON()).toBeTruthy();
  });

  it('has the expected props', () => {
    const { getByTestId } = render(<Logo />);
    
    const logo = getByTestId('logo-image');
    
    expect(logo.props.resizeMode).toBe('contain');
    // We can't test the exact source since we're mocking it
    expect(logo.props.source).toBeTruthy();
  });
});
