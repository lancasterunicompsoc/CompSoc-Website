export interface IStream {
  read(n?: number): string;
}

export interface OStream {
  write(data: string): number;
  writeln(data: string): number;
}

export type IOStream = IStream & OStream;

enum TokenType {
  background,
  reset,
  text,
}

enum Color {
  black,
  red,
  green,
  yellow,
  blue,
  purple,
  cyan,
  white,
}

type Style = {
  foreground: Color,
  background: Color,
}

type Token = {
  type: TokenType.reset
} | {
  type: TokenType.text, text: string
} | {
  type: TokenType.background, color: Color
};

function tokenizeEscapeCode(code: string): Token {
  if (code === "0") {
    return { type: TokenType.reset };
  }
  if (!code.includes(";")) {
    switch (code) {
      case "40": return { type: TokenType.background, color: Color.black };
      case "41": return { type: TokenType.background, color: Color.red };
      case "42": return { type: TokenType.background, color: Color.green };
      case "43": return { type: TokenType.background, color: Color.yellow };
      case "44": return { type: TokenType.background, color: Color.blue };
      case "45": return { type: TokenType.background, color: Color.purple };
      case "46": return { type: TokenType.background, color: Color.cyan };
      case "47": return { type: TokenType.background, color: Color.white };
      default: throw new Error("invalid color code");
    }
  }
  const [first, second] = code.split(";");
  switch (first) {
    case "0": break;
  }
}

export function colorize(input: string): string {
  const tokens: Token[] = [];
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
      tokens.push({ type: TokenType.text, text: buffer });
      buffer = "";
      escapeCode = escapeCode.substring(1);
      tokens.push(tokenizeEscapeCode(escapeCode));
      i = j;
    } else {
      buffer += input[i];
    }
  }
  console.log(tokens);
  return tokens.join("");
}
