import dedent from "dedent";

export const createElementComponent = "const CreateElementComponent = () => React.createElement('div', null, null)";

export const arrowFunctionComponent = "const FunctionComponent = () => <div></div>";

export const functionComponent = dedent`
  function FunctionComponent() {
      return <div></div>
  }
`;

export const memoComponent = dedent`
  import { memo } from 'react'

  const MemoComponent = memo(() => <div></div>)
`;

export const forwardRefComponent = dedent`
  import { forwardRef } from 'react'

  const ForwardRefComponent = forwardRef(() => <div></div>)
`;

export const memoForwardRefComponent = dedent`
  import { memo, forwardRef } from 'react'

  const MemoForwardRefComponent = memo(forwardRef(() => <div></div>))
`;

export const allComponents = Object.freeze([
  arrowFunctionComponent,
  functionComponent,
  createElementComponent,
  memoComponent,
  forwardRefComponent,
  memoForwardRefComponent,
]);
