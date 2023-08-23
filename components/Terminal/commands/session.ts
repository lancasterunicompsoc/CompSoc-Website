import register, { CommandHandler, Params, State } from "./registry";

export const whoami = (_state: State, _params: Params): string => {
  // TODO: get username from session
  return "anonymous";
};

const join: CommandHandler = (_state, _params) => {
  // TODO: perform redirect
  return "Redirecting to join page...";
};

register("whoami", whoami);
register("join", join);
