import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MainLayout } from '../MainLayout';

describe('MainLayout', () => {
  const mockChildren = <div>Test Content</div>;
  const mockHeader = <div>Test Header</div>;
  const mockFooter = <div>Test Footer</div>;
  const mockSidebar = <div>Test Sidebar</div>;

  it('renderiza correctamente con todas las props', () => {
    const { getByText } = render(
      <MainLayout
        header={mockHeader}
        footer={mockFooter}
        sidebar={mockSidebar}
      >
        {mockChildren}
      </MainLayout>
    );

    expect(getByText('Test Content')).toBeTruthy();
    expect(getByText('Test Header')).toBeTruthy();
    expect(getByText('Test Footer')).toBeTruthy();
    expect(getByText('Test Sidebar')).toBeTruthy();
  });

  it('renderiza solo el contenido cuando no se proporcionan props adicionales', () => {
    const { getByText, queryByText } = render(
      <MainLayout>{mockChildren}</MainLayout>
    );

    expect(getByText('Test Content')).toBeTruthy();
    expect(queryByText('Test Header')).toBeNull();
    expect(queryByText('Test Footer')).toBeNull();
    expect(queryByText('Test Sidebar')).toBeNull();
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <MainLayout style={customStyle}>{mockChildren}</MainLayout>
    );

    const container = getByTestId('main-layout');
    expect(container.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = render(
      <MainLayout className="custom-layout">{mockChildren}</MainLayout>
    );

    const container = getByTestId('main-layout');
    expect(container.props.className).toContain('custom-layout');
  });

  it('renderiza con un estilo personalizado para el header', () => {
    const customHeaderStyle = { backgroundColor: 'blue' };
    const { getByTestId } = render(
      <MainLayout
        header={mockHeader}
        headerStyle={customHeaderStyle}
      >
        {mockChildren}
      </MainLayout>
    );

    const header = getByTestId('main-layout-header');
    expect(header.props.style).toMatchObject(customHeaderStyle);
  });

  it('renderiza con un estilo personalizado para el footer', () => {
    const customFooterStyle = { backgroundColor: 'green' };
    const { getByTestId } = render(
      <MainLayout
        footer={mockFooter}
        footerStyle={customFooterStyle}
      >
        {mockChildren}
      </MainLayout>
    );

    const footer = getByTestId('main-layout-footer');
    expect(footer.props.style).toMatchObject(customFooterStyle);
  });

  it('renderiza con un estilo personalizado para el sidebar', () => {
    const customSidebarStyle = { backgroundColor: 'yellow' };
    const { getByTestId } = render(
      <MainLayout
        sidebar={mockSidebar}
        sidebarStyle={customSidebarStyle}
      >
        {mockChildren}
      </MainLayout>
    );

    const sidebar = getByTestId('main-layout-sidebar');
    expect(sidebar.props.style).toMatchObject(customSidebarStyle);
  });

  it('renderiza con un estilo personalizado para el contenido', () => {
    const customContentStyle = { backgroundColor: 'purple' };
    const { getByTestId } = render(
      <MainLayout contentStyle={customContentStyle}>
        {mockChildren}
      </MainLayout>
    );

    const content = getByTestId('main-layout-content');
    expect(content.props.style).toMatchObject(customContentStyle);
  });

  it('maneja el evento onHeaderPress correctamente', () => {
    const onHeaderPressMock = jest.fn();
    const { getByTestId } = render(
      <MainLayout
        header={mockHeader}
        onHeaderPress={onHeaderPressMock}
      >
        {mockChildren}
      </MainLayout>
    );

    fireEvent.press(getByTestId('main-layout-header'));
    expect(onHeaderPressMock).toHaveBeenCalled();
  });

  it('maneja el evento onFooterPress correctamente', () => {
    const onFooterPressMock = jest.fn();
    const { getByTestId } = render(
      <MainLayout
        footer={mockFooter}
        onFooterPress={onFooterPressMock}
      >
        {mockChildren}
      </MainLayout>
    );

    fireEvent.press(getByTestId('main-layout-footer'));
    expect(onFooterPressMock).toHaveBeenCalled();
  });

  it('maneja el evento onSidebarPress correctamente', () => {
    const onSidebarPressMock = jest.fn();
    const { getByTestId } = render(
      <MainLayout
        sidebar={mockSidebar}
        onSidebarPress={onSidebarPressMock}
      >
        {mockChildren}
      </MainLayout>
    );

    fireEvent.press(getByTestId('main-layout-sidebar'));
    expect(onSidebarPressMock).toHaveBeenCalled();
  });

  it('renderiza con un layout personalizado', () => {
    const customLayout = {
      header: { height: 100 },
      footer: { height: 50 },
      sidebar: { width: 200 },
      content: { padding: 20 },
    };

    const { getByTestId } = render(
      <MainLayout layout={customLayout}>{mockChildren}</MainLayout>
    );

    const header = getByTestId('main-layout-header');
    const footer = getByTestId('main-layout-footer');
    const sidebar = getByTestId('main-layout-sidebar');
    const content = getByTestId('main-layout-content');

    expect(header.props.style).toMatchObject({ height: 100 });
    expect(footer.props.style).toMatchObject({ height: 50 });
    expect(sidebar.props.style).toMatchObject({ width: 200 });
    expect(content.props.style).toMatchObject({ padding: 20 });
  });
}); 