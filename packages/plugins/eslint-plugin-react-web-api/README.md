# eslint-plugin-react-web-api

ESLint React's ESLint plugin for React to interact with Web APIs.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-web-api
```

## Setup

```js
// eslint.config.js

// @ts-check
import js from "@eslint/js";
import reactWebApi from "eslint-plugin-react-web-api";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactWebApi.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
      "react-web-api/no-leaked-event-listener": "warn",
    },
  },
);
```

## Web API Rules

> [!NOTE]
> Web API rules prevent resource leaks by detecting uncleaned Web API subscriptions in components and hooks.

**Implemented Rules:**

- [`no-leaked-event-listener`](./web-api-no-leaked-event-listener) - Prevents leaked `addEventListener` calls
- [`no-leaked-interval`](./web-api-no-leaked-interval) - Prevents leaked `setInterval` calls
- [`no-leaked-resize-observer`](./web-api-no-leaked-resize-observer) - Prevents leaked `ResizeObserver` instances
- [`no-leaked-timeout`](./web-api-no-leaked-timeout) - Prevents leaked `setTimeout` calls

## Rules

<https://eslint-react.xyz/docs/rules/overview#web-api-rules>

## Rules to be implemented

| Rule                                    | Description                                   |
| :-------------------------------------- | :-------------------------------------------- |
| `no-leaked-idle-callback`               | Prevents leaked `requestIdleCallback`         |
| `no-leaked-animation-frame`             | Prevents leaked `requestAnimationFrame`       |
| `no-leaked-event-source`                | Prevents leaked `EventSource`                 |
| `no-leaked-intersection-observer`       | Prevents leaked `IntersectionObserver`        |
| `no-leaked-mutation-observer`           | Prevents leaked `MutationObserver`            |
| `no-leaked-performance-observer`        | Prevents leaked `PerformanceObserver`         |
| `no-leaked-websocket`                   | Prevents leaked `WebSocket`                   |
| `no-leaked-broadcast-channel`           | Prevents leaked `BroadcastChannel`            |
| `no-leaked-geolocation`                 | Prevents leaked `Geolocation.watchPosition()` |
| `no-leaked-absolute-orientation-sensor` | Prevents leaked `AbsoluteOrientationSensor`   |
| `no-leaked-relative-accelerometer`      | Prevents leaked `Accelerometer`               |
| `no-leaked-ambient-light-sensor`        | Prevents leaked `AmbientLightSensor`          |
| `no-leaked-gravity-sensor`              | Prevents leaked `GravitySensor`               |
| `no-leaked-gyroscope`                   | Prevents leaked `Gyroscope`                   |
| `no-leaked-linear-acceleration-sensor`  | Prevents leaked `LinearAccelerationSensor`    |
| `no-leaked-magnetometer`                | Prevents leaked `Magnetometer`                |
| `no-leaked-orientation-sensor`          | Prevents leaked `OrientationSensor`           |
