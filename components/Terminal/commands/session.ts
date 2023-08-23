import type { CommandHandler } from "./registry";
import { register } from "./registry";

export const whoami: CommandHandler = (_state, _params): string => {
  // TODO: get username from session
  return "anonymous";
};

const join: CommandHandler = (_state, _params) => {
  // TODO: perform redirect
  return "Redirecting to join page...";
};

register({
  name: "whoami",
  fn: whoami,
  help: "Returns the name of the current user",
});
register({ name: "join", fn: join, help: "Join the society" });
