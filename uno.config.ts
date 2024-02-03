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
      "px-4 py-1 mr-1 mb-1 w-max block bg-highlight1Light dark:bg-highlight1Dark text-white text-center no-underline cursor-pointer hover:bg-highlight2Light dark:hover:bg-highlight2Dark disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    ],
    [
      "btn-secondary",
      "px-4 py-2 mr-1 mb-1 w-max block bg-slate-400 dark:bg-slate-400 text-white text-center no-underline cursor-pointer hover:bg-slate-500 dark:hover:bg-slate-500 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    ],
    [
      "icon-btn",
      "inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600",
    ],
    [
      "card",
      "px-4 py-4 bg-#ddd dark:bg-lightgrey shadow-highlight2Light dark:shadow-highlight2Dark hover:shadow-highlight1Light hover:dark:shadow-highlight1Dark",
    ],
    ["centered", "mx-auto"],
    ["row", "flex flex-row justify-evenly items-stretch"],
    ["column", "flex flex-col justify-evenly items-stretch"],
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
  safelist: [
    "bg-terminal-black",
    "bg-terminal-red",
    "bg-terminal-green",
    "bg-terminal-yellow",
    "bg-terminal-blue",
    "bg-terminal-purple",
    "bg-terminal-cyan",
    "bg-terminal-white",
    "text-terminal-black",
    "text-terminal-red",
    "text-terminal-green",
    "text-terminal-yellow",
    "text-terminal-blue",
    "text-terminal-purple",
    "text-terminal-cyan",
    "text-terminal-white",
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      lightbg: "#e7e7e7",
      darkgrey: "#333",
      lightgrey: "#222",
      textcolour: "#e8ebeb",
      highlight1Dark: "#ec5042",
      highlight2Dark: "#d14537",
      highlight1Light: "#d12415",
      highlight2Light: "#ae3428",
      darkred: "#d14537",

      "terminal-black": "#000000",
      "terminal-red": "#d14537",
      "terminal-green": "green",
      "terminal-yellow": "yellow",
      "terminal-blue": "blue",
      "terminal-purple": "purple",
      "terminal-cyan": "cyan",
      "terminal-white": "#ffffff",
    },
    boxShadow: {
      br: " 0px 0px 1px 0 #000,  1rem 1rem 0px -0.25rem var(--un-shadow-color, #fff)",
      bl: " 0px 0px 1px 0 #000, -1rem 1rem 0px -0.25rem var(--un-shadow-color, #fff)",
    },
  },
});
