import { useState } from "@lynx-js/react";

import "./App.css";

export function App() {
  const [count] = useState(0);

  return (
    <page>
      <view>
        <text>
          ReactLynx + TailwindCSS
        </text>
        <text>
          Start building amazing things with ReactLynx.
        </text>
        <view
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "40px",
            margin: "10px",
          }}
        >
          <text>
            Count: {count}
          </text>
        </view>
        <view>
          <text>01</text>
          <text>02</text>
          <text>03</text>
          <text>04</text>
          <text>05</text>
          <text>06</text>
        </view>
      </view>
    </page>
  );
}
