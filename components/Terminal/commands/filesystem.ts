import type { CommandHandler, State } from "./registry";
import { register } from "./registry";
import { whoami } from "./session";
import { eventToFile } from "./utils";

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

const makeHomeDir = (name: string): Entry => ({
  type: EntryType.directory,
  name,
  children: (_: State) =>
    [
      {
        type: EntryType.directory,
        name: "events",
        children: (state: State) => {
          const events = state.getEvents();
          if (events) {
            return events.map(e => eventToFile(e));
          }
          return [];
        },
      },
      name === "anonymous"
        ? null
        : {
            type: EntryType.file,
            name: ".wake-up",
            content: "The Matrix has you...\nFollow the white rabbit.\n",
          },
    ].filter(c => c !== null) as Entry[],
});

const fileTree: Entry = {
  type: EntryType.directory,
  name: "/",
  children: (_: State) => [
    {
      type: EntryType.directory,
      name: "home",
      children: (state: State) => {
        const iAm = whoami(state);
        const children = [makeHomeDir(iAm)];
        if (iAm !== "anonymous") {
          children.push(makeHomeDir("anonymous"));
        }
        return children;
      },
    },
  ],
};

const userHome = (state: State) => `/home/${whoami(state)}`;

function normalizePath(state: State, path: string): string {
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

function resolvePath(state: State, path?: string): string {
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

function findEntry(state: State, path: string): Entry | null {
  if (path === "/") {
    return fileTree;
  }

  const parts = normalizePath(state, path).split("/").splice(1);
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

const exists = (state: State, path: string): boolean =>
  findEntry(state, path) !== null;

const resolveParentPath = (state: State, path: string): string =>
  resolvePath(state, `${path}/..`);

export const cwd = (state: State) => state.filesystem.cwd;

const cd: CommandHandler = (state, params, { stdout }) => {
  if (params.length === 0) {
    state.filesystem.previous_cwd = state.filesystem.cwd;
    state.filesystem.cwd = userHome(state);
    return;
  }
  if (params[0] === "-") {
    const current = state.filesystem.cwd;
    state.filesystem.cwd = state.filesystem.previous_cwd;
    state.filesystem.previous_cwd = current;
    return;
  }
  const path = resolvePath(state, params[0]);
  const item = findEntry(state, path);
  if (item === null) {
    stdout.writeln(`Cannot cd to ${path}: directory does not exist`);
    return;
  }
  if (item.type !== EntryType.directory) {
    stdout.writeln(`Cannot cd to ${path}: file is not a directory`);
    return;
  }

  state.filesystem.previous_cwd = state.filesystem.cwd;
  state.filesystem.cwd = path;
};

const ls: CommandHandler = (state, params, { stdout }) => {
  const flags = params.filter(p => p.startsWith("-")).map(p => p.substring(1));
  const targets = params.filter(p => !p.startsWith("-"));
  if (targets.length === 0) {
    targets.push(".");
  }

  let all = false;
  let most = false;
  let list = false;
  for (const flag of flags) {
    if (flag.startsWith("-")) {
      continue;
    }
    if (flag.includes("a")) {
      all = true;
      most = true;
    }
    if (flag.includes("A")) {
      most = true;
    }
    if (flag.includes("l")) {
      list = true;
    }
  }

  targets.forEach((target, i) => {
    const path = resolvePath(state, target);
    const item = findEntry(state, path);
    if (item === null) {
      stdout.writeln(`Cannot access '${path}': no such file or directory`);
      return;
    }

    if (item.type !== EntryType.directory) {
      stdout.writeln(path);
      return;
    }

    const children = item.children(state)
      .filter(child => !child.name.startsWith(".") || most);
    if (all) {
      const parent = findEntry(state, resolveParentPath(state, path));
      children.push(
        { ...item, name: "." },
        { ...(parent ?? item), name: ".." },
      );
    }
    if (targets.length > 1) {
      stdout.writeln(`${target}:`);
    }
    if (list) {
      stdout.writeln(`total ${children.length}`);
      children
        .sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1)
        .forEach(child => {
          stdout.writeln(child.name);
        });
    } else {
      stdout.writeln(
        children
          .map(child => child.name)
          .sort()
          .join("    "),
      );
    }
    if (targets.length - 1 !== i) {
      stdout.writeln("");
    }
  });
};

const cat: CommandHandler = (state, params, { stdout }) => {
  for (const param of params) {
    const path = resolvePath(state, param);
    const item = findEntry(state, path);
    if (item === null) {
      stdout.writeln(`Cannot access '${path}': no such file or directory`);
      continue;
    }
    if (item.type !== EntryType.file) {
      stdout.writeln(`Cannot read '${path}': it is not a file`);
      continue;
    }
    stdout.write(item.content);
  }
};

register({
  name: "cat",
  fn: cat,
  help: "Concatenate files to standard output",
});
register({
  name: "cd",
  fn: cd,
  help: "Change working directory to the one specified in the first argument",
});
register({
  name: "cwd",
  fn: (state, _, { stdout }) => stdout.writeln(cwd(state)),
  help: "Display current working directory",
});
register({
  name: "pwd",
  fn: (state, _, { stdout }) => stdout.writeln(cwd(state)),
  help: "Display current working directory",
});
register({
  name: "ls",
  fn: ls,
  help: "List all files and directories in current working directory, or in the specified directory when passed an argument",
});
