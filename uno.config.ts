import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [
    [
      "btn",
      "px-4 py-1 rounded inline-block bg-highlight1Light dark:bg-highlight1Dark text-white cursor-pointer hover:bg-highlight2Light dark:hover:bg-highlight2Dark disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    ],
    [
      "btn-secondary",
      "px-4 py-1 rounded inline-block text-white cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50 bg-blue-400 hover:bg-blue-500",
    ],
    [
      "icon-btn",
      "inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600",
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "DM Sans",
        serif: "DM Serif Display",
        mono: "DM Mono",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      darkgrey: "#333",
      lightgrey: "#222",
      textcolour: "#e8ebeb",
      highlight1Dark: "#ec5042",
      highlight2Dark: "#d14537",
      highlight1Light: "#d12415",
      highlight2Light: "#ae3428",
    },
  },
});
