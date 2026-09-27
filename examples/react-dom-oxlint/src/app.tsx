import { useState } from "react";

const items = [
  { id: "alpha", label: "Alpha" },
  { id: "beta", label: "Beta" },
  { id: "gamma", label: "Gamma" },
] as const;

export function App() {
  const [selected, setSelected] = useState("alpha");
  return (
    <main>
      <h1>ESLint React + Oxlint, without ESLint</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button type="button" onClick={() => setSelected(item.id)}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <p>Selected: {selected}</p>
    </main>
  );
}
