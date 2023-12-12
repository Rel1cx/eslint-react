export const version = await Bun
  .file("VERSION")
  .text()
  .then((v) => v.trim());
