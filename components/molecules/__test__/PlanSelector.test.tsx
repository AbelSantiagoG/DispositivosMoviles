import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PlanSelector } from '../PlanSelector';

describe('PlanSelector', () => {
  const mockPlans = [
    {
      id: '1',
      title: 'Plan Básico',
      description: 'Plan básico para principiantes',
      price: 100,
      features: ['Característica 1', 'Característica 2'],
    },
    {
      id: '2',
      title: 'Plan Pro',
      description: 'Plan profesional',
      price: 200,
      features: ['Característica 1', 'Característica 2', 'Característica 3'],
      isPopular: true,
    },
    {
      id: '3',
      title: 'Plan Enterprise',
      description: 'Plan empresarial',
      price: 300,
      features: ['Característica 1', 'Característica 2', 'Característica 3', 'Característica 4'],
      isRecommended: true,
    },
  ];

  it('renderiza correctamente la lista de planes', () => {
    const { getByText } = render(
      <PlanSelector plans={mockPlans} onSelect={() => {}} />
    );

    expect(getByText('Plan Básico')).toBeTruthy();
    expect(getByText('Plan Pro')).toBeTruthy();
    expect(getByText('Plan Enterprise')).toBeTruthy();
  });

  it('maneja el evento onSelect correctamente', () => {
    const onSelectMock = jest.fn();
    const { getByTestId } = render(
      <PlanSelector plans={mockPlans} onSelect={onSelectMock} />
    );

    fireEvent.press(getByTestId('plan-card-1'));
    expect(onSelectMock).toHaveBeenCalledWith(mockPlans[0]);
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <PlanSelector plans={mockPlans} onSelect={() => {}} style={customStyle} />
    );

    const container = getByTestId('plan-selector');
    expect(container.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = render(
      <PlanSelector
        plans={mockPlans}
        onSelect={() => {}}
        className="custom-selector"
      />
    );

    const container = getByTestId('plan-selector');
    expect(container.props.className).toContain('custom-selector');
  });

  it('renderiza el plan seleccionado correctamente', () => {
    const { getByTestId } = render(
      <PlanSelector
        plans={mockPlans}
        onSelect={() => {}}
        selectedPlanId="2"
      />
    );

    const selectedPlan = getByTestId('plan-card-2');
    expect(selectedPlan.props.className).toContain('selected');
  });

  it('renderiza el badge de popular correctamente', () => {
    const { getByText } = render(
      <PlanSelector plans={mockPlans} onSelect={() => {}} />
    );

    expect(getByText('Popular')).toBeTruthy();
  });

  it('renderiza el badge de recomendado correctamente', () => {
    const { getByText } = render(
      <PlanSelector plans={mockPlans} onSelect={() => {}} />
    );

    expect(getByText('Recomendado')).toBeTruthy();
  });

  it('renderiza los precios con descuento correctamente', () => {
    const plansWithDiscount = mockPlans.map(plan => ({
      ...plan,
      originalPrice: plan.price * 2,
    }));

    const { getByText } = render(
      <PlanSelector plans={plansWithDiscount} onSelect={() => {}} />
    );

    expect(getByText('$200.00')).toBeTruthy();
    expect(getByText('$100.00')).toBeTruthy();
    expect(getByText('$400.00')).toBeTruthy();
    expect(getByText('$200.00')).toBeTruthy();
    expect(getByText('$600.00')).toBeTruthy();
    expect(getByText('$300.00')).toBeTruthy();
  });

  it('renderiza un mensaje cuando no hay planes disponibles', () => {
    const { getByText } = render(
      <PlanSelector plans={[]} onSelect={() => {}} />
    );

    expect(getByText('No hay planes disponibles')).toBeTruthy();
  });
}); 