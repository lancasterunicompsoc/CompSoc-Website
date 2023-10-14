export interface IStream {
  read(n?: number): string;
}

export interface OStream {
  write(data: string): number;
  writeln(data: string): number;
}

export type IOStream = IStream & OStream;
