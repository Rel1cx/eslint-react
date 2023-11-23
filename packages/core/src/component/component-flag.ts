import { hasCallInInitPath } from "./component-init-path";
import { type ExRFunctionComponent } from "./component-kind";

export type ExRComponentFlag = bigint;

/* eslint-disable perfectionist/sort-objects */
export const ExRComponentFlag = {
  None: 0n,
  Memo: 1n << 0n,
  ForwardRef: 1n << 1n,
  // Reserved for future use
  // CreateElement: 1n << 2n,
  // Reserved for future use
  // hasHooks: 1n << 3n,
  // Reserved for future use
  // Async: 1n << 4n,
};

export function getComponentFlag(initPath: ExRFunctionComponent["initPath"], pragma: string) {
  let flag = ExRComponentFlag.None;

  if (hasCallInInitPath("memo")(initPath) || hasCallInInitPath(`${pragma}.memo`)(initPath)) {
    flag |= ExRComponentFlag.Memo;
  }

  if (hasCallInInitPath("forwardRef")(initPath) || hasCallInInitPath(`${pragma}.forwardRef`)(initPath)) {
    flag |= ExRComponentFlag.ForwardRef;
  }

  return flag;
}
