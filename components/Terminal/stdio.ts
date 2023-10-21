export interface IStream {
  read(n?: number): string;
}

export interface OStream {
  write(data: string): number;
  writeln(data: string): number;
}

export type IOStream = IStream & OStream;

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
  foreground: Color,
  background: Color,
  weight: Weight,
  underline: Underline,
};
const DEFAULT_STYLE: Style = {
  foreground: Color.white,
  background: Color.black,
  weight: Weight.normal,
  underline: Underline.none,
};

export type StyledSpan = { text: string; style: Style };

function parseEscapeCode(code: string, currentStyle: Style): Style {
  return code.split(";").reduce((style, part) => {
    switch (Number.parseInt(part)) {
      case 0:
        return DEFAULT_STYLE;
      case 1:
        return { ...style, weight: Weight.bold };
      case 2:
        return { ...style, weight: Weight.faint };
      case 4:
        return { ...style, underline: Underline.single };
      case 7:
        return { ...style, foreground: style.background, background: style.foreground };
      case 21:
        return { ...style, underline: Underline.double };
      case 22:
        return { ...style, weight: Weight.normal };
      case 24:
        return { ...style, underline: Underline.none };
      case 30:
        return { ...style, foreground: Color.black };
      case 31:
        return { ...style, foreground: Color.red };
      case 32:
        return { ...style, foreground: Color.green };
      case 33:
        return { ...style, foreground: Color.yellow };
      case 34:
        return { ...style, foreground: Color.blue };
      case 35:
        return { ...style, foreground: Color.purple };
      case 36:
        return { ...style, foreground: Color.cyan };
      case 37:
        return { ...style, foreground: Color.white };
      case 39:
        return { ...style, foreground: DEFAULT_STYLE.foreground };
      case 40:
        return { ...style, background: Color.black };
      case 41:
        return { ...style, background: Color.red };
      case 42:
        return { ...style, background: Color.green };
      case 43:
        return { ...style, background: Color.yellow };
      case 44:
        return { ...style, background: Color.blue };
      case 45:
        return { ...style, background: Color.purple };
      case 46:
        return { ...style, background: Color.cyan };
      case 47:
        return { ...style, background: Color.white };
      case 49:
        return { ...style, background: DEFAULT_STYLE.background };
      default:
        throw new Error("invalid code");
    }
  }, currentStyle);
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
