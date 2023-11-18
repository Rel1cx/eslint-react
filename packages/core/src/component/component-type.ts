// Source: https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactWorkTags.js
// Commented out types are runtime only WorkTags that are not needed for static analysis purposes

export type ReactComponentType =
  | 0
  | 1
  // | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  // | 15
  | 16
  // | 17
  | 18
  | 19
  | 20;
// | 21
// | 22
// | 23
// | 24
// | 25
// | 26
// | 27

export const ReactFunctionComponent = 0;
export const ReactClassComponent = 1;
// export const ReactIndeterminateComponent = 2; // Before we know whether it is function or class
export const ReactHostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const ReactHostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const ReactHostComponent = 5;
export const ReactHostText = 6;
export const ReactFragment = 7;
export const ReactMode = 8;
export const ReactContextConsumer = 9;
export const ReactContextProvider = 10;
export const ReactForwardRef = 11;
export const ReactProfiler = 12;
export const ReactSuspenseComponent = 13;
export const ReactMemoComponent = 14;
// export const ReactSimpleMemoComponent = 15;
export const ReactLazyComponent = 16;
// export const ReactIncompleteClassComponent = 17;
export const ReactDehydratedFragment = 18;
export const ReactSuspenseListComponent = 19;
// export const ReactScopeComponent = 21;
// export const ReactOffscreenComponent = 22;
// export const ReactLegacyHiddenComponent = 23;
// export const ReactCacheComponent = 24;
// export const ReactTracingMarkerComponent = 25;
// export const ReactHostHoistable = 26;
// export const ReactHostSingleton = 27;

export type ReactHostComponentType = 0 | 1 | 2;

export const ReactHostHTMLComponent = 0;

export const ReactHostSVGComponent = 1;

export const ReactHostWebComponent = 2;
