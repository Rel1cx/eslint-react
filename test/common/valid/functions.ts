import dedent from "dedent";

export const fn = "const fn = () => null";

export const fnWithReturn = dedent`
    function fnWithReturn() {
        return null
    }
`;

export const renderFunction = "const renderFunction = (id: string, name: string) => <div key={id} id={id}>{name}</div>";

export const renderFunctionWithReturn = dedent`
    function renderFunctionWithReturn(id: string, name: string) {
        return <div key={id} id={id}>{name}</div>
    }
`;

export const allFunctions = Object.freeze([
    fn,
    fnWithReturn,
    renderFunction,
    renderFunctionWithReturn,
]);
