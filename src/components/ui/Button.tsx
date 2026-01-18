import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import type { ButtonProps as BootstrapButtonProps } from 'react-bootstrap';

// Type-safe wrapper for React Bootstrap Button to avoid TypeScript union type complexity with React 19
// This wrapper simplifies the complex union types that React 19 creates with react-bootstrap
export interface ButtonProps extends Omit<BootstrapButtonProps, 'as'> {
  as?: React.ElementType;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return <BootstrapButton {...props} />;
};

export default Button;
