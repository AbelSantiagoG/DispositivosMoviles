import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DashboardHeader } from '../DashboardHeader';

describe('DashboardHeader', () => {
  const mockTitle = 'Test Title';
  const mockSubtitle = 'Test Subtitle';
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.jpg'
  };

  it('renderiza correctamente con todas las props', () => {
    const { getByText, getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        subtitle={mockSubtitle}
        user={mockUser}
      />
    );
    
    expect(getByText(mockTitle)).toBeTruthy();
    expect(getByText(mockSubtitle)).toBeTruthy();
    expect(getByText(mockUser.name)).toBeTruthy();
    expect(getByTestId('logo-image')).toBeTruthy();
  });

  it('renderiza solo el título cuando no hay otras props', () => {
    const { getByText, queryByText } = render(
      <DashboardHeader title={mockTitle} />
    );
    
    expect(getByText(mockTitle)).toBeTruthy();
    expect(queryByText(mockSubtitle)).toBeNull();
    expect(queryByText(mockUser.name)).toBeNull();
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        style={customStyle}
      />
    );
    
    const header = getByTestId('dashboard-header');
    expect(header.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        className="custom-class"
      />
    );
    
    const header = getByTestId('dashboard-header');
    expect(header.props.className).toContain('custom-class');
  });

  it('maneja el evento onMenuPress correctamente', () => {
    const onMenuPressMock = jest.fn();
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        onMenuPress={onMenuPressMock}
      />
    );
    
    fireEvent.press(getByTestId('menu-button'));
    expect(onMenuPressMock).toHaveBeenCalled();
  });

  it('maneja el evento onNotificationPress correctamente', () => {
    const onNotificationPressMock = jest.fn();
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        onNotificationPress={onNotificationPressMock}
      />
    );
    
    fireEvent.press(getByTestId('notification-button'));
    expect(onNotificationPressMock).toHaveBeenCalled();
  });

  it('maneja el evento onProfilePress correctamente', () => {
    const onProfilePressMock = jest.fn();
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        user={mockUser}
        onProfilePress={onProfilePressMock}
      />
    );
    
    fireEvent.press(getByTestId('profile-button'));
    expect(onProfilePressMock).toHaveBeenCalled();
  });

  it('renderiza el contador de notificaciones cuando se proporciona', () => {
    const { getByText } = render(
      <DashboardHeader
        title={mockTitle}
        notificationCount={5}
      />
    );
    
    expect(getByText('5')).toBeTruthy();
  });

  it('renderiza el badge de notificación cuando hay notificaciones no leídas', () => {
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        notificationCount={5}
      />
    );
    
    expect(getByTestId('notification-badge')).toBeTruthy();
  });

  it('renderiza el botón de búsqueda cuando se proporciona onSearch', () => {
    const onSearchMock = jest.fn();
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        onSearch={onSearchMock}
      />
    );
    
    const searchButton = getByTestId('search-button');
    expect(searchButton).toBeTruthy();
    
    fireEvent.press(searchButton);
    expect(onSearchMock).toHaveBeenCalled();
  });

  it('renderiza el input de búsqueda cuando se proporciona onSearch', () => {
    const onSearchMock = jest.fn();
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        onSearch={onSearchMock}
      />
    );
    
    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeTruthy();
    
    fireEvent.changeText(searchInput, 'test search');
    expect(onSearchMock).toHaveBeenCalledWith('test search');
  });

  it('renderiza el botón de ayuda cuando se proporciona onHelp', () => {
    const onHelpMock = jest.fn();
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        onHelp={onHelpMock}
      />
    );
    
    const helpButton = getByTestId('help-button');
    expect(helpButton).toBeTruthy();
    
    fireEvent.press(helpButton);
    expect(onHelpMock).toHaveBeenCalled();
  });

  it('renderiza el botón de configuración cuando se proporciona onSettings', () => {
    const onSettingsMock = jest.fn();
    const { getByTestId } = render(
      <DashboardHeader
        title={mockTitle}
        onSettings={onSettingsMock}
      />
    );
    
    const settingsButton = getByTestId('settings-button');
    expect(settingsButton).toBeTruthy();
    
    fireEvent.press(settingsButton);
    expect(onSettingsMock).toHaveBeenCalled();
  });
}); 