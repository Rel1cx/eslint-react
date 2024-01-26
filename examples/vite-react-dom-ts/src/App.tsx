import "./App.css";

import { useState } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
