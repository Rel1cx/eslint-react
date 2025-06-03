import { pluginQRCode } from "@lynx-js/qrcode-rsbuild-plugin";
import { pluginReactLynx } from "@lynx-js/react-rsbuild-plugin";
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { pluginTailwindCSS } from "rsbuild-plugin-tailwindcss";

export default defineConfig({
  plugins: [
    pluginReactLynx(),
    pluginQRCode(),
    pluginTailwindCSS(),
    pluginTypeCheck(),
  ],
  environments: {
    web: {},
    lynx: {},
  },
});
