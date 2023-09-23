export const fn = "const fn = () => null";
export const renderFunction = `const renderFunction = (id: string, name: string) => <div key={id} id={id}>{name}</div>`;
export const createElementComponent = `const CreateElementComponent = () => React.createElement('div', null, null)`;
export const arrowFunctionComponent = `const FunctionComponent = () => <div></div>`;
export const functionComponent = `function FunctionComponent() { return <div></div> }`;
export const all = Object.freeze([fn, renderFunction, arrowFunctionComponent, functionComponent]);
export const allComponent = Object.freeze([arrowFunctionComponent, functionComponent, createElementComponent]);
export const allNonComponent = Object.freeze([fn, renderFunction]);
