export const createElementComponent = "const CreateElementComponent = () => React.createElement('div', null, null)";

export const arrowFunctionComponent = "const FunctionComponent = () => <div></div>";

export const functionComponent = /* tsx */ `
  /// <reference types="react" />
  /// <reference types="react-dom" />

  function FunctionComponent() {
      return <div></div>
  }
`;

export const memoComponent = /* tsx */ `
  /// <reference types="react" />
  /// <reference types="react-dom" />

  import { memo } from 'react'

  const MemoComponent = memo(() => <div></div>)
`;

export const forwardRefComponent = /* tsx */ `
  /// <reference types="react" />
  /// <reference types="react-dom" />

  import { forwardRef } from 'react'

  const ForwardRefComponent = forwardRef((props, ref) => <div></div>)
`;

export const memoForwardRefComponent = /* tsx */ `
  /// <reference types="react" />
  /// <reference types="react-dom" />

  import { memo, forwardRef } from 'react'

  const MemoForwardRefComponent = memo(forwardRef((props, ref) => <div></div>))
`;

export const allComponents = [
  arrowFunctionComponent,
  functionComponent,
  createElementComponent,
  memoComponent,
  forwardRefComponent,
  memoForwardRefComponent,
] as const;
