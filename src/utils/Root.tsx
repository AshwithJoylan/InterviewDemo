import React from 'react';
import MenuComponent, { MenuInterface } from './Menu';
import AlertComponent, { AlertInterface } from './Alert';
import ToastComponent, { ToastInterface } from './Toast';

/**
 * @interface RootProps
 */
interface RootProps {}

let Menu: MenuInterface | null = null;
let Alert: AlertInterface | null = null;
let Toast: ToastInterface | null = null;

/**
 * Root
 */
const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <>
      <MenuComponent ref={(menu) => (Menu = menu)} />
      <AlertComponent ref={(alert) => (Alert = alert)} />
      <ToastComponent ref={(toast) => (Toast = toast)} />
      {children}
    </>
  );
};

export { Menu, Alert, Toast };
export default Root;
