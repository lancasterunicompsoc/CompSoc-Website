import { CommandHandler, register } from "./registry";

const shell: CommandHandler = (_state, params, _io) => {
  const src = params[0];
};

register({
  name: "bash",
  fn: shell,
  help: "Runs the given shell script. Pass `-` for stdin",
});
