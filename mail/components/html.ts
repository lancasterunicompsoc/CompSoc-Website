type Children = string | undefined | Children[];
export type Attributes = {
  children?: Children;
  id?: string;
  class?: string | string[];
};
type ContentTag = (children?: Attributes | Children) => string;

const DEFAULT_ATTRS: Attributes = {};

function renderContent(content: Children): string {
  if (Array.isArray(content)) {
    return content.map(renderContent).join("");
  }
  return content ?? "";
}

function renderAttrs(attrs: Attributes): string {
  return Object.entries(attrs)
    .filter(([k, _]) => k !== "children")
    .map(([k, v]) => [k, Array.isArray(v) ? v.join(" ") : v])
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
}

function makeContentTag(name: string): ContentTag {
  return attrs => {
    if (Array.isArray(attrs) || typeof attrs === "string") {
      attrs = { children: attrs };
    }
    const content = attrs?.children ?? [];
    return `<${name} ${renderAttrs(attrs ?? DEFAULT_ATTRS)}>${renderContent(
      content,
    )}</${name}>`;
  };
}

export const head = makeContentTag("head");
export const body = makeContentTag("body");

export const h1 = makeContentTag("h1");
export const h2 = makeContentTag("h2");
export const h3 = makeContentTag("h3");
export const h4 = makeContentTag("h4");
export const h5 = makeContentTag("h5");
export const h6 = makeContentTag("h6");
export const p = makeContentTag("p");

export const div = makeContentTag("div");
export const span = makeContentTag("span");
export const main = makeContentTag("main");
export const section = makeContentTag("section");
export const article = makeContentTag("article");

export const figure = makeContentTag("figure");
export const figcaption = makeContentTag("figcaption");

export function html(attrs?: Attributes | string | string[]): string {
  if (Array.isArray(attrs) || typeof attrs === "string") {
    attrs = { children: attrs };
  }
  const content = attrs?.children ?? [];
  return `<!DOCTYPE html><html ${renderAttrs(
    attrs ?? DEFAULT_ATTRS,
  )}>${renderContent(content)}</html>`;
}

export function a(
  attrs?: (Attributes & { href?: string }) | string | string[],
): string {
  if (Array.isArray(attrs) || typeof attrs === "string") {
    attrs = { children: attrs };
  }
  const content = attrs?.children ?? [];
  return `<a ${renderAttrs(attrs ?? DEFAULT_ATTRS)}>${renderContent(
    content,
  )}</a>`;
}

export function img(attrs: Attributes & { src: string, alt: string }): string {
  return `<img ${renderAttrs(attrs ?? DEFAULT_ATTRS)} />`;
}

type Margin = 0 | string;
type Style = {
  backgroundColor?: string;
  boxSizing?: string;
  color?: string;
  display?: "none" | "block" | "flex";
  flexWrap?: "wrap" | "no-wrap";
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number;
  margin?:
    | Margin
    | { left?: Margin; right?: Margin; top?: Margin; bottom?: Margin };
  maxWidth?: string;
  padding?: 0 | string;
  textAlign?: "left" | "right" | "center" | "none";
  textDecoration?: string;
} | { [index: string]: string };
export function style(
  styles: string | { [index: string]: Style | string },
): string {
  if (typeof styles === "string") {
    return `<style>${styles}</style>`;
  }
  let result = "<style>";
  for (const [key, value] of Object.entries(styles)) {
    result += `${key} { ${renderStyleItem(value)} }`;
  }
  result += "</style>";
  return result;
}

function renderStyleItem(
  s: string | { [index: string]: any },
  baseAttr: string | undefined = undefined,
): string {
  if (typeof s === "string") {
    return s;
  }
  return Object.entries(s)
    .map(([k, v]) => [
      {
        backgroundColor: "background-color",
        boxSizing: "box-sizing",
        flexWrap: "flex-wrap",
        fontFamily: "font-family",
        fontSize: "font-size",
        fontWeight: "font-weight",
        textAlign: "text-align",
        textDecoration: "text-decoration",
        lineHeight: "line-height",
        maxWidth: "max-width",
      }[k] ?? k,
      v,
    ])
    .map(([k, v]) => [baseAttr === undefined ? k : `${baseAttr}-${k}`, v])
    .map(([k, v]) => {
      if (v === undefined) {
        return "";
      }
      if (typeof v === "string" || typeof v === "number") {
        return `${k}: ${v};`;
      }
      if (Array.isArray(v)) {
        return `${k}: ${v.join("")}`;
      }
      if (typeof v === "object") {
        return renderStyleItem(v, k);
      }
      throw new Error("unknown style thingy");
    })
    .join("");
}
