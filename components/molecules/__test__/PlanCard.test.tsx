import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PlanCard } from '../PlanCard';

describe('PlanCard', () => {
  const mockPlan = {
    id: '1',
    title: 'Plan Básico',
    description: 'Plan básico para principiantes',
    price: 100,
    features: ['Característica 1', 'Característica 2'],
  };

  it('renderiza correctamente con todas las props', () => {
    const { getByText } = render(
      <PlanCard plan={mockPlan} onSelect={() => {}} />
    );

    expect(getByText('Plan Básico')).toBeTruthy();
    expect(getByText('Plan básico para principiantes')).toBeTruthy();
    expect(getByText('$100.00')).toBeTruthy();
    expect(getByText('Característica 1')).toBeTruthy();
    expect(getByText('Característica 2')).toBeTruthy();
  });

  it('formatea correctamente el precio', () => {
    const { getByText } = render(
      <PlanCard
        plan={{ ...mockPlan, price: 1000 }}
        onSelect={() => {}}
      />
    );

    expect(getByText('$1,000.00')).toBeTruthy();
  });

  it('maneja el evento onSelect correctamente', () => {
    const onSelectMock = jest.fn();
    const { getByTestId } = render(
      <PlanCard plan={mockPlan} onSelect={onSelectMock} />
    );

    fireEvent.press(getByTestId('plan-card'));
    expect(onSelectMock).toHaveBeenCalledWith(mockPlan);
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <PlanCard plan={mockPlan} onSelect={() => {}} style={customStyle} />
    );

    const card = getByTestId('plan-card');
    expect(card.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = render(
      <PlanCard
        plan={mockPlan}
        onSelect={() => {}}
        className="custom-plan"
      />
    );

    const card = getByTestId('plan-card');
    expect(card.props.className).toContain('custom-plan');
  });

  it('renderiza como seleccionado cuando se proporciona la prop selected', () => {
    const { getByTestId } = render(
      <PlanCard plan={mockPlan} onSelect={() => {}} selected />
    );

    const card = getByTestId('plan-card');
    expect(card.props.className).toContain('selected');
  });

  it('renderiza con un precio de descuento', () => {
    const { getByText } = render(
      <PlanCard
        plan={{ ...mockPlan, originalPrice: 200 }}
        onSelect={() => {}}
      />
    );

    expect(getByText('$200.00')).toBeTruthy();
    expect(getByText('$100.00')).toBeTruthy();
  });

  it('renderiza con un badge de popular', () => {
    const { getByText } = render(
      <PlanCard
        plan={{ ...mockPlan, isPopular: true }}
        onSelect={() => {}}
      />
    );

    expect(getByText('Popular')).toBeTruthy();
  });

  it('renderiza con un badge de recomendado', () => {
    const { getByText } = render(
      <PlanCard
        plan={{ ...mockPlan, isRecommended: true }}
        onSelect={() => {}}
      />
    );

    expect(getByText('Recomendado')).toBeTruthy();
  });
}); 