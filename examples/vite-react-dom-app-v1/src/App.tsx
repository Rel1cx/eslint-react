import "./App.css";

import { useState } from "react";

import logo from "./assets/eslint-react.svg";

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
