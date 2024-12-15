# eslint-plugin-react-web-api

ESLint React's ESLint plugin for React to interact with Web APIs.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-web-api
```

## Setup

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
        "react-web-api/no-leaked-event-listener": "warn",
        "react-web-api/no-leaked-interval": "warn",
        "react-web-api/no-leaked-resize-observer": "warn",
        "react-web-api/no-leaked-timeout": "warn",
      }
    ],
  },
];
```

## Rules

<https://eslint-react.xyz/docs/rules/overview#web-api-rules>

## Rules to be implemented

| Rule                                    | Description                                   | 💭  |     |
| :-------------------------------------- | :-------------------------------------------- | :-: | :-: |
| `no-leaked-idle-callback`               | Prevents leaked `requestIdleCallback`         |     | 🚧  |
| `no-leaked-animation-frame`             | Prevents leaked `requestAnimationFrame`       |     | 🚧  |
| `no-leaked-event-source`                | Prevents leaked `EventSource`                 |     | 🚧  |
| `no-leaked-intersection-observer`       | Prevents leaked `IntersectionObserver`        |     | 🚧  |
| `no-leaked-mutation-observer`           | Prevents leaked `MutationObserver`            |     | 🚧  |
| `no-leaked-performance-observer`        | Prevents leaked `PerformanceObserver`         |     | 🚧  |
| `no-leaked-websocket`                   | Prevents leaked `WebSocket`                   |     | 🚧  |
| `no-leaked-broadcast-channel`           | Prevents leaked `BroadcastChannel`            |     | 🚧  |
| `no-leaked-geolocation`                 | Prevents leaked `Geolocation.watchPosition()` |     | 🚧  |
| `no-leaked-absolute-orientation-sensor` | Prevents leaked `AbsoluteOrientationSensor`   |     | 🚧  |
| `no-leaked-relative-accelerometer`      | Prevents leaked `Accelerometer`               |     | 🚧  |
| `no-leaked-ambient-light-sensor`        | Prevents leaked `AmbientLightSensor`          |     | 🚧  |
| `no-leaked-gravity-sensor`              | Prevents leaked `GravitySensor`               |     | 🚧  |
| `no-leaked-gyroscope`                   | Prevents leaked `Gyroscope`                   |     | 🚧  |
| `no-leaked-linear-acceleration-sensor`  | Prevents leaked `LinearAccelerationSensor`    |     | 🚧  |
| `no-leaked-magnetometer`                | Prevents leaked `Magnetometer`                |     | 🚧  |
| `no-leaked-orientation-sensor`          | Prevents leaked `OrientationSensor`           |     | 🚧  |
