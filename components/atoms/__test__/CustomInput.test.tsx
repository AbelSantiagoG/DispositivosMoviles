import React from 'react';
import { render } from '@testing-library/react-native';
import { CustomInput } from '../CustomInput';
import { useForm } from 'react-hook-form';

// Mock component to test CustomInput with react-hook-form
interface TestComponentProps {
  label: string;
  error?: string;
}

const TestComponent = ({ label, error }: TestComponentProps) => {
  const { control } = useForm({
    defaultValues: {
      test: ''
    }
  });
  
  return (
    <CustomInput
      control={control}
      name="test"
      label={label}
      error={error}
      placeholder="Enter text"
    />
  );
};

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {
      register: jest.fn(),
      unregister: jest.fn(),
      getFieldState: jest.fn(),
      _names: {
        array: new Set(),
        mount: new Set(),
        unMount: new Set(),
        watch: new Set(),
        focus: '',
        watchAll: false
      },
      _subjects: {
        watch: { next: jest.fn() },
        array: { next: jest.fn() },
        state: { next: jest.fn() }
      },
      _getWatch: jest.fn(),
      _formValues: [],
      _defaultValues: {}
    }
  }),
  Controller: ({ render }: { render: any }) => render({
    field: {
      onChange: jest.fn(),
      value: ''
    }
  })
}));

describe('CustomInput component', () => {
  it('renders with label correctly', () => {
    const { getByText } = render(
      <TestComponent label="Test Label" />
    );
    
    const label = getByText('Test Label');
    expect(label).toBeTruthy();
  });

  it('displays error message when provided', () => {
    const { getByText } = render(
      <TestComponent label="Test Label" error="This field is required" />
    );
    
    const errorMessage = getByText('This field is required');
    expect(errorMessage).toBeTruthy();
  });

  it('does not display error message when not provided', () => {
    const { queryByText } = render(
      <TestComponent label="Test Label" />
    );
    
    const errorMessage = queryByText('This field is required');
    expect(errorMessage).toBeNull();
  });
});
