import { EntryType } from "../filesystem";
import type { State } from "../commands/registry";
import { whoami } from "../commands/session";

import type { Entry, FileEntry } from "./types";
import { fileTree } from "./tree";

export type { Entry } from "./types";
export { EntryType } from "./types";

export function normalizePath(state: State, path: string): string {
  const parts = path.split("/");
  let normalizedParts: string[] = [];

  for (const part of parts) {
    switch (part) {
      case "":
      case ".":
        continue;
      case "..":
        normalizedParts.pop();
        break;
      case "~":
        normalizedParts = ["/home", whoami(state)];
        break;
      default:
        normalizedParts.push(part);
    }
  }

  let normalizedPath = normalizedParts.join("/");
  if (path.startsWith("/") && !normalizedPath.startsWith("/")) {
    normalizedPath = "/" + normalizedPath;
  }

  return normalizedPath;
}

export function resolvePath(state: State, path?: string): string {
  let fullPath;
  if (path === undefined) {
    fullPath = cwd(state);
  } else if (path.startsWith("/")) {
    fullPath = path;
  } else {
    fullPath = cwd(state) + "/" + path;
  }
  return normalizePath(state, fullPath);
}

export function findEntry(state: State, path: string): Entry | null {
  if (path === "/") {
    return fileTree;
  }

  const parts = resolvePath(state, path).split("/").splice(1);
  let dir = fileTree;
  for (const part of parts) {
    if (dir.type !== EntryType.directory) {
      return null;
    }

    let found = false;
    for (const child of dir.children(state)) {
      if (child.name === part) {
        dir = child;
        found = true;
        break;
      }
    }
    if (!found) {
      return null;
    }
  }
  return dir;
}

export const userHome = (state: State) => `/home/${whoami(state)}`;

export const exists = (state: State, path: string): boolean =>
  findEntry(state, path) !== null;

export const resolveParentPath = (state: State, path: string): string =>
  resolvePath(state, `${path}/..`);

export const cwd = (state: State) => state.filesystem.cwd;

export async function readFile(
  state: State,
  entry: FileEntry,
): Promise<string> {
  if (typeof entry.content === "string") {
    return entry.content;
  }
  const content = entry.content(state);
  if (typeof content === "string") {
    return content;
  }
  return await content;
}
