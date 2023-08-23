import register, { CommandHandler, Params, State } from "./registry";

export const whoami = (state: State, params: Params): string => {
  // TODO: get username from session
  return "anonymous";
};

const join: CommandHandler = (state, params) => {
  // TODO: perform redirect
  return "Redirecting to join page...";
};

register("whoami", whoami);
register("join", join);
