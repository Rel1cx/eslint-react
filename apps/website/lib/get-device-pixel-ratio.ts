export function getDevicePixelRatio(fallback = 2, precision = 3) {
  if (typeof window === "undefined") return fallback;
  const factor = Math.pow(10, precision);
  return Math.round(window.devicePixelRatio * factor) / factor;
}
