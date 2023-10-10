import systemInfo from "../systemInfo";
import type { CommandHandler } from "./registry";
import { register, getHelp, getAllCommands } from "./registry";
import { whoami } from "./session";

const echo: CommandHandler = (_state, params) => {
  return params.join(" ");
};

const info: CommandHandler = (_state, params) => {
  const target = params.join(" ");
  switch (target.toLowerCase()) {
    case "compsoc":
    case "lucompsoc":
    case "computer science society":
      return "Lancaster University Computer Science Society exists to promote interest in computing and technology among students and wider society.";

    case "lu":
    case "uni":
    case "lancaster university":
      return "Lancaster University is a collegiate university 3 miles south of Lancaster.";

    default:
      return `Could not find information for \`${target}\`. Try \`info compsoc\``;
  }
};

const neofetch: CommandHandler = (state, _params) => {
  const responseLines = [];
  responseLines.push(`${whoami(state, [])}@compsoc.io`);
  responseLines.push(
    "-".repeat((responseLines.at(responseLines.length - 1) as string).length),
  );
  responseLines.push(`OS: ${systemInfo.os.name} (${systemInfo.os.edition})`);
  responseLines.push(
    `Shell: ${systemInfo.shell.name} ${systemInfo.shell.version}`,
  );
  responseLines.push(`Resolution: ${systemInfo.resolution}`);
  responseLines.push(`Theme: ${systemInfo.theme}`);
  responseLines.push(`Terminal: ${systemInfo.terminal}`);
  responseLines.push(`Processor: ${systemInfo.processor}`);
  return responseLines.join("\n");
};

const man: CommandHandler = (_state, params) => {
  if (params.length > 0) {
    if (params.length > 1) {
      return "man can only display one helppage at a time";
    }
    const helptext = getHelp(params[0] as string);
    if (!helptext) {
      return `No manual entry for ${params[0]}`;
    }
    return helptext;
  }
  const commandStrings = getAllCommands().sort().join("\n");
  return `Help:\nThe following commands are available:\n${commandStrings}\nFor more information, run \`man PROGRAMNAME\``;
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
