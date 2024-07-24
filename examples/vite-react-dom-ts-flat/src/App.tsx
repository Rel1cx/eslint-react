import "./App.css";

import { useState } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0n);

  return (
    <div>
      <div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <div className="card">
        <input type="text" value={0} defaultValue={0} />
        <button type="button" onClick={() => setCount((count) => count + 1n)}>
          count is {count.toString()}
        </button>
      </div>
    </div>
  );
}

export default App;
