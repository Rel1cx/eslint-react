import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const { meta, docs } = defineDocs({
  dir: "content/docs",
});

export default defineConfig();

// import { defineConfig, defineDocs } from "fumadocs-mdx/config";
// import { transformerTwoslash } from "fumadocs-twoslash";
// import { remarkInstall } from "fumadocs-docgen";

// export const { docs, meta } = defineDocs({
//   dir: "content/docs",
//   // docs: {
//   //   async: true,
//   // },
// });

// export default defineConfig({
//   lastModifiedTime: "git",
//   mdxOptions: async () => {
//     const { rehypeCodeDefaultOptions } = await import(
//       "fumadocs-core/mdx-plugins"
//     );
//     return {
//       rehypeCodeOptions: {
//         lazy: true,
//         langs: ["ts", "js", "html"],
//         inline: "tailing-curly-colon",
//         // themes: {
//         //   light: "catppuccin-latte",
//         //   dark: "catppuccin-mocha",
//         // },
//         transformers: [
//           ...(rehypeCodeDefaultOptions.transformers ?? []),
//           transformerTwoslash(),
//           {
//             name: "transformers:remove-notation-escape",
//             code(hast) {
//               for (const line of hast.children) {
//                 if (line.type !== "element") continue;

//                 const lastSpan = line.children.findLast(
//                   (v) => v.type === "element",
//                 );

//                 const head = lastSpan?.children[0];
//                 if (head?.type !== "text") return;

//                 head.value = head.value.replace(/\[\\!code/g, "[!code");
//               }
//             },
//           },
//         ],
//       },
//       remarkPlugins: [
//         [remarkInstall, { persist: { id: "package-manager" } }],
//       ],
//       // rehypePlugins: (v) => [rehypeKatex, ...v],
//     };
//   },
// });
