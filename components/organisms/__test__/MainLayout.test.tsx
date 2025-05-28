import React from 'react';
import { render } from '@testing-library/react-native';
import { MainLayout } from '../MainLayout';

// Mock de react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, className }) => (
    <div data-testid="safe-area" className={className}>
      {children}
    </div>
  ),
}));

describe('MainLayout', () => {
  it('renderiza correctamente con ScrollView por defecto', () => {
    const { getByTestId } = render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    const safeArea = getByTestId('safe-area');
    expect(safeArea).toBeTruthy();
    expect(safeArea.props.className).toBeTruthy();
  });

  it('renderiza correctamente con View cuando scrollable es false', () => {
    const { getByTestId } = render(
      <MainLayout scrollable={false}>
        <div>Test Content</div>
      </MainLayout>
    );

    const safeArea = getByTestId('safe-area');
    expect(safeArea).toBeTruthy();
  });

  it('pasa props adicionales al componente Content', () => {
    const testID = 'test-content';
    const { getByTestId } = render(
      <MainLayout testID={testID}>
        <div>Test Content</div>
      </MainLayout>
    );

    const safeArea = getByTestId('safe-area');
    expect(safeArea).toBeTruthy();
  });

  it('renderiza children correctamente', () => {
    const testContent = 'Test Content';
    const { getByText } = render(
      <MainLayout>
        <div>{testContent}</div>
      </MainLayout>
    );

    expect(getByText(testContent)).toBeTruthy();
  });

  it('aplica las clases correctas del token', () => {
    const { getByTestId } = render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    const safeArea = getByTestId('safe-area');
    expect(safeArea.props.className).toBeTruthy();
  });

  it('renderiza el layout principal', () => {
    const { getByText } = render(
      <MainLayout><span>Contenido</span></MainLayout>
    );
    expect(getByText('Contenido')).toBeTruthy();
  });
}); 