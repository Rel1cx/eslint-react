"use strict";

function assert(cond) {
  if (!cond) {
    throw new Error("Assertion violated.");
  }
}

export default assert;
