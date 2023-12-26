import systemInfo from "../systemInfo";
import type { CommandHandler } from "./registry";
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

const man: CommandHandler = (_state, params, { stdout }) => {
  if (params.length > 0) {
    if (params.length > 1) {
      stdout.writeln("man can only display one helppage at a time");
      return;
    }
    const helptext = getHelp(params[0] as string);
    if (!helptext) {
      stdout.writeln(`No manual entry for ${params[0]}`);
      return;
    }
    stdout.writeln(helptext);
    return;
  }
  const commandStrings = getAllCommands().sort().join("\n");
  stdout.writeln("Help:");
  stdout.writeln("The following commands are available:");
  stdout.writeln(commandStrings);
  stdout.writeln("For more information, run `man PROGRAMNAME`");
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
