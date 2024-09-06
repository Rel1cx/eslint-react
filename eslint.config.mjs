// eslint-disable-next-line no-restricted-syntax
const mod = await import("importx").then(x =>
  x.import("./eslint.config.mts", {
    loader: "tsx",
    parentURL: import.meta.url,
  })
);

export default mod.default;
