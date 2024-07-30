export const fn = "const fn = () => null";

export const fnReturn = /* tsx */ `
  function fnWithReturn() {
      return null
  }
`;

export const fnReturnJSX = "const footer = () => <div />";

export const renderFunction = "const renderFunction = (id: string, name: string) => <div key={id} id={id}>{name}</div>";

export const renderFunctionReturn = /* tsx */ `
  function renderFunctionWithReturn(id: string, name: string) {
      return <div key={id} id={id}>{name}</div>
  }
`;

export const renderFunctionNestedRenderFunction = /* tsx */ `
  function renderFunctionWithNestedRenderFunction(id: string, name: string) {
      return <Component footer={() => <div />} />
  }
`;

export const allFunctions = [
  fn,
  fnReturn,
  fnReturnJSX,
  renderFunction,
  renderFunctionReturn,
  renderFunctionNestedRenderFunction,
] as const;
