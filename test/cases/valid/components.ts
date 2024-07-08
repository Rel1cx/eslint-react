export const createElementComponent = "const CreateElementComponent = () => React.createElement('div', null, null)";

export const arrowFunctionComponent = "const FunctionComponent = () => <div></div>";

export const functionComponent = /* tsx */ `
  function FunctionComponent() {
      return <div></div>
  }
`;

export const memoComponent = /* tsx */ `
  import { memo } from 'react'

  const MemoComponent = memo(() => <div></div>)
`;

export const forwardRefComponent = /* tsx */ `
  import { forwardRef } from 'react'

  const ForwardRefComponent = forwardRef((props, ref) => <div></div>)
`;

export const memoForwardRefComponent = /* tsx */ `
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
