import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import type { ButtonProps as BootstrapButtonProps } from 'react-bootstrap';

// Simplified ButtonProps to avoid TypeScript union type complexity with React 19
export type ButtonProps = Omit<BootstrapButtonProps, 'as'> & {
  as?: keyof React.JSX.IntrinsicElements;
};

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
