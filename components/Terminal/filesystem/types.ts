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
  content: string;
}

export type Entry = DirEntry | FileEntry;

type ChildFactory = (state: State) => Entry[];
