import { StdIO } from "../stdio";
import systemInfo from "../systemInfo";
import { EntryType, findEntry, readFile } from "../filesystem";
import type { CommandHandler, State } from "./registry";
import {
  register,
  getHelp,
  getAllCommands as getNativeCommands,
} from "./registry";
import { whoami } from "./session";

const echo: CommandHandler = (_state, params, { stdout }) => {
  stdout.writeln(params.join(" "));
};

const info: CommandHandler = (_state, params, { stdout }) => {
  const target = params.join(" ");
  switch (target.toLowerCase()) {
    case "compsoc":
    case "lucompsoc":
    case "computer science society":
      stdout.write(
        "Lancaster University Computer Science Society exists to promote interest in computing and technology among students and wider society.",
      );
      break;

    case "lu":
    case "uni":
    case "lancaster university":
      stdout.write(
        "Lancaster University is a collegiate university 3 miles south of Lancaster.",
      );
      break;

    default:
      stdout.write(
        `Could not find information for \`${target}\`. Try \`info compsoc\``,
      );
      break;
  }
};

const neofetch: CommandHandler = (state, _params, { stdout }) => {
  const n = stdout.writeln(`${whoami(state)}@compsoc.io`);
  stdout.writeln("-".repeat(n - 1));
  stdout.writeln(`OS: ${systemInfo.os.name} (${systemInfo.os.edition})`);
  stdout.writeln(`Shell: ${systemInfo.shell.name} ${systemInfo.shell.version}`);
  stdout.writeln(`Resolution: ${systemInfo.resolution}`);
  stdout.writeln(`Theme: ${systemInfo.theme}`);
  stdout.writeln(`Terminal: ${systemInfo.terminal}`);
  stdout.writeln(`Processor: ${systemInfo.processor}`);
};

async function printManPage(
  section: string,
  page: string,
  state: State,
  { stdout }: StdIO,
): Promise<boolean> {
  const entry = findEntry(
    state,
    `/usr/share/man/man${section}/${page}.${section}`,
  );
  if (!entry || entry.type !== EntryType.file) {
    return false;
  }
  stdout.writeln(await readFile(state, entry));
  return true;
}

const man: CommandHandler = async (state, params, stdio) => {
  const { stdout } = stdio;
  if (params.length === 0) {
    const commandStrings = getNativeCommands().sort().join("\n");
    stdout.writeln("Help:");
    stdout.writeln(
      "The following commands are available natively in the shell, others may be available in your path:",
    );
    stdout.writeln(commandStrings);
    stdout.writeln("For more information, run `man PROGRAMNAME`");
    return 1;
  }

  if (params.length === 1) {
    const helptext = getHelp(params[0] as string);
    if (helptext) {
      stdout.writeln(helptext);
      return;
    }
    for (const section of "12345678") {
      if (await printManPage(section, params[0] as string, state, stdio)) {
        return;
      }
    }
    stdout.writeln(`No manual entry for ${params[0]}`);
  }

  if (
    !(await printManPage(
      params[0] as string,
      params[1] as string,
      state,
      stdio,
    ))
  ) {
    stdout.writeln(`No manual entry for ${params[1]} in section ${params[0]}`);
  }
};

const which: CommandHandler = (state, params, { stdout }) => {
  if (params.length === 0) {
    stdout.writeln("Usage:");
    stdout.writeln("    which <PROGRAMNAME>...");
    return 1;
  }

  let failedArguments = 0;
  for (const cmd of params) {
    if (getNativeCommands().includes(cmd)) {
      stdout.writeln("native command");
      continue;
    }
    let found = false;
    for (const dir of state.filesystem.path) {
      const entry = findEntry(state, dir + "/" + cmd);
      if (entry && entry.type === EntryType.file) {
        stdout.writeln(`${dir}/${cmd}`);
        found = true;
        break;
      }
    }
    if (!found) {
      stdout.writeln(`could not find ${cmd}`);
      failedArguments++;
    }
  }
  return params.length === 0 ? -1 : failedArguments;
};

register({ name: "echo", fn: echo });
register({
  name: "info",
  fn: info,
  help: "Get information about various things",
});
register({
  name: "neofetch",
  fn: neofetch,
});
register({ name: "help", fn: man });
register({ name: "man", fn: man });
register({ name: "which", fn: which });
