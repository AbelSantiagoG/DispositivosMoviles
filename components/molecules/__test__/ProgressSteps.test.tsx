import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressSteps } from '../ProgressSteps';
import { RegisterContext } from '../../../context/RegisterContext';

describe('ProgressSteps', () => {
  const mockSteps = [
    { id: '1', title: 'Paso 1' },
    { id: '2', title: 'Paso 2' },
    { id: '3', title: 'Paso 3' }
  ];

  const mockRegisterContext = {
    currentStep: 0,
    steps: mockSteps,
    setCurrentStep: jest.fn(),
    completedSteps: []
  };

  const renderWithContext = (component: React.ReactNode) => {
    return render(
      <RegisterContext.Provider value={mockRegisterContext}>
        {component}
      </RegisterContext.Provider>
    );
  };

  it('renderiza correctamente los pasos', () => {
    const { getByText } = renderWithContext(<ProgressSteps />);
    
    mockSteps.forEach(step => {
      expect(getByText(step.title)).toBeTruthy();
    });
  });

  it('resalta el paso actual', () => {
    const { getByTestId } = renderWithContext(<ProgressSteps />);
    
    const currentStep = getByTestId(`step-${mockRegisterContext.currentStep}`);
    expect(currentStep.props.className).toContain('active');
  });

  it('muestra los pasos completados', () => {
    const contextWithCompletedStep = {
      ...mockRegisterContext,
      completedSteps: ['1']
    };

    const { getByTestId } = render(
      <RegisterContext.Provider value={contextWithCompletedStep}>
        <ProgressSteps />
      </RegisterContext.Provider>
    );

    const completedStep = getByTestId('step-1');
    expect(completedStep.props.className).toContain('completed');
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = renderWithContext(
      <ProgressSteps style={customStyle} />
    );
    
    const container = getByTestId('progress-steps');
    expect(container.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = renderWithContext(
      <ProgressSteps className="custom-class" />
    );
    
    const container = getByTestId('progress-steps');
    expect(container.props.className).toContain('custom-class');
  });

  it('muestra el indicador de progreso correctamente', () => {
    const { getByTestId } = renderWithContext(<ProgressSteps />);
    
    const progressBar = getByTestId('progress-bar');
    const expectedWidth = (mockRegisterContext.currentStep / (mockSteps.length - 1)) * 100;
    expect(progressBar.props.style.width).toBe(`${expectedWidth}%`);
  });

  it('maneja el último paso correctamente', () => {
    const contextWithLastStep = {
      ...mockRegisterContext,
      currentStep: mockSteps.length - 1
    };

    const { getByTestId } = render(
      <RegisterContext.Provider value={contextWithLastStep}>
        <ProgressSteps />
      </RegisterContext.Provider>
    );

    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style.width).toBe('100%');
  });
}); 