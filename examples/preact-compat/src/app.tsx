import "./App.css";

import { useState } from "preact/hooks";

import logo from "./assets/eslint-react.svg";

import type { ComponentProps } from "react";
import type { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react-dom";

function App() {
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
}

export default App;

export function PaginationItem({ ...props }: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

export function PaginationItem2({ ...props }: ComponentPropsWithRef<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

export function PaginationItem3({ ...props }: ComponentPropsWithoutRef<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}
