import React from 'react';
import { render } from '@testing-library/react-native';
import { PlanSelector } from '../PlanSelector';

jest.mock('../../molecules/PlanCard', () => ({
  PlanCard: (props) => <div data-testid="plan-card">Plan</div>,
}));
jest.mock('../../molecules/PaymentModal', () => ({
  PaymentModal: (props) => <div data-testid="payment-modal">Modal</div>,
}));
jest.mock('../../molecules/ProgressSteps', () => ({
  ProgressSteps: (props) => <div data-testid="progress-steps">Steps</div>,
}));

describe('PlanSelector', () => {
  const mockPlans = [
    { id: '1', title: 'Plan 1', price: 100, description: 'desc' },
    { id: '2', title: 'Plan 2', price: 200, description: 'desc' },
  ];
  it('renderiza los planes y el modal', () => {
    const { getAllByTestId, getByTestId } = render(
      <PlanSelector plans={mockPlans} onPlanSelected={() => {}} onPaymentComplete={() => {}} />
    );
    expect(getAllByTestId('plan-card').length).toBe(2);
    expect(getByTestId('payment-modal')).toBeTruthy();
    expect(getByTestId('progress-steps')).toBeTruthy();
  });
}); 