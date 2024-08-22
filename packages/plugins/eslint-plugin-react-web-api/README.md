# eslint-plugin-react-web-api

ESLint React's ESLint plugin for React to interact with Web APIs.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-web-api
```

## Setup

Add the plugin to your `eslint.config.js`:

```js
// @ts-check

import js from "@eslint/js";
import reactWebAPI from "eslint-plugin-react-web-api";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: [
      "react-web-api": reactWebAPI,
      rules: {
        // react-web-api recommended rules
        "react-web-api/no-leaked-timeout": "error",
        "react-web-api/no-leaked-interval": "error",
        "react-web-api/no-leaked-event-listener": "error",
      }
    ],
  },
];
```

## Rules

| Rule                                    | Description                                   | 💼  | 💭  |     |
| :-------------------------------------- | :-------------------------------------------- | :-: | :-: | :-: |
| `no-leaked-timeout`                     | Prevents leaked `setTimeout`                  |  ✔️  |     |     |
| `no-leaked-interval`                    | Prevents leaked `setInterval`                 |  ✔️  |     |     |
| `no-leaked-idle-callback`               | Prevents leaked `requestIdleCallback`         |  ✔️  |     | 🚧  |
| `no-leaked-animation-frame`             | Prevents leaked `requestAnimationFrame`       |  ✔️  |     | 🚧  |
| `no-leaked-event-source`                | Prevents leaked `EventSource`                 |  ✔️  |     | 🚧  |
| `no-leaked-event-listener`              | Prevents leaked `addEventListener`            |  ✔️  |     |     |
| `no-leaked-resize-observer`             | Prevents leaked `ResizeObserver`              |  ✔️  |     | 🚧  |
| `no-leaked-intersection-observer`       | Prevents leaked `IntersectionObserver`        |  ✔️  |     | 🚧  |
| `no-leaked-mutation-observer`           | Prevents leaked `MutationObserver`            |  ✔️  |     | 🚧  |
| `no-leaked-performance-observer`        | Prevents leaked `PerformanceObserver`         |  ✔️  |     | 🚧  |
| `no-leaked-websocket`                   | Prevents leaked `WebSocket`                   |  ✔️  |     | 🚧  |
| `no-leaked-broadcast-channel`           | Prevents leaked `BroadcastChannel`            |  ✔️  |     | 🚧  |
| `no-leaked-geolocation`                 | Prevents leaked `Geolocation.watchPosition()` |  ✔️  |     | 🚧  |
| `no-leaked-absolute-orientation-sensor` | Prevents leaked `AbsoluteOrientationSensor`   |  ✔️  |     | 🚧  |
| `no-leaked-relative-accelerometer`      | Prevents leaked `Accelerometer`               |  ✔️  |     | 🚧  |
| `no-leaked-ambient-light-sensor`        | Prevents leaked `AmbientLightSensor`          |  ✔️  |     | 🚧  |
| `no-leaked-gravity-sensor`              | Prevents leaked `GravitySensor`               |  ✔️  |     | 🚧  |
| `no-leaked-gyroscope`                   | Prevents leaked `Gyroscope`                   |  ✔️  |     | 🚧  |
| `no-leaked-linear-acceleration-sensor`  | Prevents leaked `LinearAccelerationSensor`    |  ✔️  |     | 🚧  |
| `no-leaked-magnetometer`                | Prevents leaked `Magnetometer`                |  ✔️  |     | 🚧  |
| `no-leaked-orientation-sensor`          | Prevents leaked `OrientationSensor`           |  ✔️  |     | 🚧  |
