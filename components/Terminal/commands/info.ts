import { StdIO } from "../stdio";
import systemInfo from "../systemInfo";
import { EntryType, exists, findEntry } from "./filesystem";
import type { CommandHandler, State } from "./registry";
import { register, getHelp, getAllCommands } from "./registry";
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

function printManPage(
  page: 1,
  name: string,
  state: State,
  { stdout }: StdIO,
): boolean {
  const entry = findEntry(state, `/usr/share/man/man${page}/${name}.${page}`);
  if (!entry || entry.type !== EntryType.file) {
    return false;
  }
  stdout.writeln(entry.content);
  return true;
}

const man: CommandHandler = (state, params, stdio) => {
  const { stdout } = stdio;
  if (params.length === 0) {
    const commandStrings = getAllCommands().sort().join("\n");
    stdout.writeln("Help:");
    stdout.writeln("The following commands are available:");
    stdout.writeln(commandStrings);
    stdout.writeln("For more information, run `man PROGRAMNAME`");
  }

  if (params.length === 1) {
    const helptext = getHelp(params[0] as string);
    if (helptext) {
      stdout.writeln(helptext);
      return;
    }
    if (printManPage(1, params[0] as string, state, stdio)) {
      return;
    }
    stdout.writeln(`No manual entry for ${params[0]}`);
  }
};

register({ name: "echo", fn: echo, help: "Print the argument passed to echo" });
register({
  name: "info",
  fn: info,
  help: "Get information about various things",
});
register({
  name: "neofetch",
  fn: neofetch,
  help: "Display informations about the current shell",
});
register({ name: "help", fn: man, help: "Get help about available commands" });
register({ name: "man", fn: man, help: "Get help about available commands" });
