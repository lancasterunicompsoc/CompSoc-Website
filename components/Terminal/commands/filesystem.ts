import {
  EntryType,
  userHome,
  resolvePath,
  resolveParentPath,
  findEntry,
  readFile,
} from "../filesystem";
import type { CommandHandler } from "./registry";
import { register } from "./registry";

const cd: CommandHandler = (state, params, { stdout }) => {
  if (params.length === 0) {
    state.filesystem.previous_cwd = state.filesystem.cwd;
    state.filesystem.cwd = userHome(state);
    return 0;
  }
  if (params[0] === "-") {
    const current = state.filesystem.cwd;
    state.filesystem.cwd = state.filesystem.previous_cwd;
    state.filesystem.previous_cwd = current;
    stdout.writeln(state.filesystem.cwd);
    return 0;
  }
  const path = resolvePath(state, params[0]);
  const item = findEntry(state, path);
  if (item === null) {
    stdout.writeln(`Cannot cd to ${path}: directory does not exist`);
    return 0;
  }
  if (item.type !== EntryType.directory) {
    stdout.writeln(`Cannot cd to ${path}: file is not a directory`);
    return 0;
  }

  state.filesystem.previous_cwd = state.filesystem.cwd;
  state.filesystem.cwd = path;

  return 1;
};

const ls: CommandHandler = (state, params, { stdout }) => {
  const flagStrings = params
    .filter(p => p.startsWith("-"))
    .map(p => p.substring(1));
  const targets = params.filter(p => !p.startsWith("-"));
  if (targets.length === 0) {
    targets.push(".");
  }

  const flags = {
    all: false,
    most: false,
    list: false,
  };
  for (const flag of flagStrings) {
    if (flag.startsWith("-")) {
      switch (flag) {
        case "-all":
          flags.all = true;
          flags.most = true;
          break;
        case "-almost-all":
          flags.most = true;
          break;
      }
      continue;
    }
    if (flag.includes("a")) {
      flags.all = true;
      flags.most = true;
    }
    if (flag.includes("A")) {
      flags.most = true;
    }
    if (flag.includes("l")) {
      flags.list = true;
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

    const children = item
      .children(state)
      .filter(child => !child.name.startsWith(".") || flags.most);
    if (flags.all) {
      const parent = findEntry(state, resolveParentPath(state, path));
      children.push(
        { ...item, name: "." },
        { ...(parent ?? item), name: ".." },
      );
    }
    if (targets.length > 1) {
      stdout.writeln(`${target}:`);
    }
    if (flags.list) {
      stdout.writeln(`total ${children.length}`);
      children
        .sort((a, b) => (a.name === b.name ? 0 : a.name < b.name ? -1 : 1))
        .forEach(child => {
          stdout.writeln(child.name);
        });
    } else if (children.length > 0) {
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

const cat: CommandHandler = async (state, params, { stdout }) => {
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
    stdout.writeln(await readFile(state, item));
  }
};

const tac: CommandHandler = async (state, params, { stdout }) => {
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
    stdout.writeln(
      await readFile(state, item).then(data =>
        data.split("\n").reverse().join("\n"),
      ),
    );
  }
};

register({ name: "cat", fn: cat });
register({ name: "tac", fn: tac });
register({ name: "cd", fn: cd });
register({ name: "ls", fn: ls });
