import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UserNotificationList } from '../UserNotificationList';

describe('UserNotificationList', () => {
  const mockNotifications = [
    { id: 1, message: 'Notificación 1', type: 'info', createdAt: new Date() },
    { id: 2, message: 'Notificación 2', type: 'warning', createdAt: new Date() },
    { id: 3, message: 'Notificación 3', type: 'error', createdAt: new Date() },
  ];

  it('renderiza correctamente la lista de notificaciones', () => {
    const { getByText } = render(
      <UserNotificationList notifications={mockNotifications} />
    );
    
    expect(getByText('Notificación 1')).toBeTruthy();
    expect(getByText('Notificación 2')).toBeTruthy();
    expect(getByText('Notificación 3')).toBeTruthy();
  });

  it('renderiza un mensaje cuando no hay notificaciones', () => {
    const { getByText } = render(<UserNotificationList notifications={[]} />);
    expect(getByText('No hay notificaciones')).toBeTruthy();
  });

  it('maneja el evento onPress correctamente', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <UserNotificationList
        notifications={mockNotifications}
        onPress={onPressMock}
      />
    );
    
    fireEvent.press(getByText('Notificación 1'));
    expect(onPressMock).toHaveBeenCalledWith(mockNotifications[0]);
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <UserNotificationList
        notifications={mockNotifications}
        style={customStyle}
      />
    );
    
    const container = getByTestId('notification-list-container');
    expect(container.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = render(
      <UserNotificationList
        notifications={mockNotifications}
        className="custom-list"
      />
    );
    
    const container = getByTestId('notification-list-container');
    expect(container.props.className).toContain('custom-list');
  });

  it('renderiza los diferentes tipos de notificaciones correctamente', () => {
    const { getByTestId } = render(
      <UserNotificationList notifications={mockNotifications} />
    );
    
    expect(getByTestId('notification-info-1')).toBeTruthy();
    expect(getByTestId('notification-warning-2')).toBeTruthy();
    expect(getByTestId('notification-error-3')).toBeTruthy();
  });

  it('formatea correctamente las fechas de las notificaciones', () => {
    const { getByText } = render(
      <UserNotificationList notifications={mockNotifications} />
    );
    
    const date = new Date().toLocaleDateString();
    expect(getByText(date)).toBeTruthy();
  });
}); 