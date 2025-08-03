import { useState } from "@lynx-js/react";

import "./App.css";

export function App() {
  const [count] = useState(0);

  return (
    <page>
      <view className="flex flex-col justify-center items-center min-h-screen text-center">
        <text className="text-6xl font-bold leading-normal underline">
          ReactLynx + TailwindCSS
        </text>
        <text className="text-lg font-normal text-gray-500 leading-normal">
          Start building amazing things with ReactLynx.
        </text>
        <view
          className="flex flex-row p-20 rounded-full"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "40px",
            margin: "10px",
          }}
        >
          <text className="text-4xl font-bold text-gray-800">
            Count: {count}
          </text>
        </view>
        <view className="grid grid-cols-3 gap-4">
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
