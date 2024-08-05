import { PrettyLogger } from "effect-log";

export const LoggerLive = PrettyLogger.layer({
  enableColors: true,
  showFiberId: true,
  showSpans: true,
  showTime: true,
});
