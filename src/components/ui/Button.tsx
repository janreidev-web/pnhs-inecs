import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import type { ButtonProps as BootstrapButtonProps } from 'react-bootstrap';

// Type-safe wrapper for React Bootstrap Button to avoid TypeScript union type complexity with React 19
// This wrapper simplifies the complex union types that React 19 creates with react-bootstrap
export type ButtonProps = BootstrapButtonProps;

// Use function declaration to avoid complex type inference issues
export function Button(props: ButtonProps): React.ReactElement {
  // Cast both props and component to avoid complex union type errors with React 19
  // The BootstrapButton component still receives properly typed props at runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const BootstrapBtn = BootstrapButton as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <BootstrapBtn {...(props as any)} />;
}

export default Button;
