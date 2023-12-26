import type { State } from "../commands/registry";

export enum EntryType {
  directory,
  file,
}

export interface DirEntry {
  type: EntryType.directory;
  name: string;
  children: ChildFactory;
}

export interface FileEntry {
  type: EntryType.file;
  name: string;
  content:
    | string
    | ((state: State) => string)
    | ((state: State) => Promise<string>);
  executable?: boolean;
}

export type Entry = DirEntry | FileEntry;

export type ChildFactory = (state: State) => Entry[];
