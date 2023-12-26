export interface IStream {
  read(n?: number): string;
}

export interface OStream {
  write(data: string): number;
  writeln(data: string): number;
}

export type IOStream = IStream & OStream;

export type StdIO = { stdin: IStream, stdout: OStream }

enum Color {
  black = "black",
  red = "red",
  green = "green",
  yellow = "yellow",
  blue = "blue",
  purple = "purple",
  cyan = "cyan",
  white = "white",
}

enum Weight {
  normal = "normal",
  bold = "bold",
  faint = "faint",
}
enum Underline {
  none = "none",
  single = "single",
  double = "double",
}

type Style = {
  foreground: Color;
  background: Color;
  weight: Weight;
  underline: Underline;
};
const DEFAULT_STYLE: Style = {
  foreground: Color.white,
  background: Color.black,
  weight: Weight.normal,
  underline: Underline.none,
};

export type StyledSpan = { text: string; style: Style };

function parseEscapeCode(code: string, currentStyle: Style): Style {
  return code.split(";").reduce(
    (style, part) =>
      ({
        0: DEFAULT_STYLE,
        1: { ...style, weight: Weight.bold },
        2: { ...style, weight: Weight.faint },
        4: { ...style, underline: Underline.single },
        7: {
          ...style,
          foreground: style.background,
          background: style.foreground,
        },
        21: { ...style, underline: Underline.double },
        22: { ...style, weight: Weight.normal },
        24: { ...style, underline: Underline.none },
        30: { ...style, foreground: Color.black },
        31: { ...style, foreground: Color.red },
        32: { ...style, foreground: Color.green },
        33: { ...style, foreground: Color.yellow },
        34: { ...style, foreground: Color.blue },
        35: { ...style, foreground: Color.purple },
        36: { ...style, foreground: Color.cyan },
        37: { ...style, foreground: Color.white },
        39: { ...style, foreground: DEFAULT_STYLE.foreground },
        40: { ...style, background: Color.black },
        41: { ...style, background: Color.red },
        42: { ...style, background: Color.green },
        43: { ...style, background: Color.yellow },
        44: { ...style, background: Color.blue },
        45: { ...style, background: Color.purple },
        46: { ...style, background: Color.cyan },
        47: { ...style, background: Color.white },
        49: { ...style, background: DEFAULT_STYLE.background },
      })[Number.parseInt(part)] ?? style,
    currentStyle,
  );
}

export function colorize(input: string): StyledSpan[] {
  const tokens: StyledSpan[] = [];
  let currentStyle = DEFAULT_STYLE;
  let buffer = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\x1B") {
      let j = i;
      while (input[j] !== "m") {
        j++;
      }
      let escapeCode = input.substring(i + 1, j);
      if (escapeCode[0] !== "[") {
        console.error("colorizing error: invalid token");
        continue;
      }
      tokens.push({ text: buffer, style: currentStyle });
      buffer = "";
      escapeCode = escapeCode.substring(1);
      currentStyle = parseEscapeCode(escapeCode, currentStyle);
      i = j;
    } else {
      buffer += input[i];
    }
  }
  return tokens;
}
