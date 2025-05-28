import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FinancialSummary } from '../FinancialSummary';

describe('FinancialSummary', () => {
  it('renderiza correctamente con los valores proporcionados', () => {
    const { getByText } = render(
      <FinancialSummary
        title="Resumen Financiero"
        amount={1000}
        onManage={() => {}}
      />
    );
    
    expect(getByText('Resumen Financiero')).toBeTruthy();
    expect(getByText('$1.000')).toBeTruthy();
  });

  it('formatea correctamente los números grandes', () => {
    const { getByText } = render(
      <FinancialSummary
        title="Resumen Financiero"
        amount={1000000}
        onManage={() => {}}
      />
    );
    
    expect(getByText('$1.000.000')).toBeTruthy();
  });

  it('maneja el evento onManage correctamente', () => {
    const onManageMock = jest.fn();
    const { getByText } = render(
      <FinancialSummary
        title="Resumen Financiero"
        amount={1000}
        onManage={onManageMock}
      />
    );
    
    fireEvent.press(getByText('Administrar'));
    expect(onManageMock).toHaveBeenCalled();
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <FinancialSummary
        title="Resumen Financiero"
        amount={1000}
        onManage={() => {}}
        style={customStyle}
      />
    );
    
    const container = getByTestId('financial-summary');
    expect(container.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = render(
      <FinancialSummary
        title="Resumen Financiero"
        amount={1000}
        onManage={() => {}}
        className="custom-class"
      />
    );
    
    const container = getByTestId('financial-summary');
    expect(container.props.className).toContain('custom-class');
  });

  it('renderiza con valores en cero', () => {
    const { getByText } = render(
      <FinancialSummary 
        title="Resumen Financiero" 
        amount={0} 
        onManage={() => {}} 
      />
    );
    expect(getByText('$0')).toBeTruthy();
  });

  it('renderiza con valores negativos', () => {
    const { getByText } = render(
      <FinancialSummary
        title="Resumen Financiero"
        amount={-1000}
        onManage={() => {}}
      />
    );
    
    expect(getByText('-$1.000')).toBeTruthy();
  });
}); 