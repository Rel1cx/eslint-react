/* eslint-disable @eslint-react/kit/boolean-prop-naming */
/* eslint-disable @eslint-react/kit/forbid-dom-props */
/* eslint-disable @eslint-react/kit/forbid-elements */
/* eslint-disable @eslint-react/kit/jsx-no-bind */
/* eslint-disable @eslint-react/kit/jsx-no-literals */
/* eslint-disable @eslint-react/kit/no-multi-comp */
import "./App.css";

import { useState } from "react";

import logo from "./assets/eslint-react.svg";

// ✅ Correct — defined with an arrow function.
const App = () => {
  const [count, setCount] = useState(0n);

  return (
    <div>
      <div>
        <a href="https://eslint-react.xyz" target="_blank" rel="noopener noreferrer">
          <img alt="logo" className="logo" src={logo} />
        </a>
      </div>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1n)}>
          count is {count.toString()}
        </button>
      </div>
    </div>
  );
};

// ✅ Correct — object-method component defined with an arrow function.
const MDXComponents = {
  Greeting: ({ name }: { name: string }) => {
    return <p>Hello, {name}!</p>;
  },
};

void MDXComponents;

// ❌ Should report: "disabled" does not match the boolean prop naming pattern.
const ToggleButton = ({ disabled }: { disabled: boolean }) => {
  return <button type="button" disabled={disabled}>Click me</button>;
};

// ❌ Should report: "visible" does not match the boolean prop naming pattern.
const Modal = ({ visible }: { visible: boolean }) => {
  return visible ? <div>Modal</div> : null;
};

// ✅ Correct — "isOpen" matches the boolean prop naming pattern.
const Drawer = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? <div>Drawer</div> : null;
};

// ✅ Correct — "hasError" matches the boolean prop naming pattern.
const InputField = ({ hasError }: { hasError: boolean }) => {
  return <input aria-invalid={hasError} />;
};

void ToggleButton;
void Modal;
void Drawer;
void InputField;

export default App;
