// @ts-check

import * as importx from "importx";

const mod = await importx.import("./next.config.ts", {
  cache: true,
  loader: "native",
  parentURL: import.meta.url,
});

export default mod.default;
