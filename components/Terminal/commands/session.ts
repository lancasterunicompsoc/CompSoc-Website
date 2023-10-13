import type { CommandHandler, Params, State } from "./registry";
import { register } from "./registry";

export const whoami = (state: State, _params: Params): string => {
  return state.session?.username ?? "anonymous";
};

const join: CommandHandler = (_state, _params) => {
  navigateTo("https://lancastersu.co.uk/groups/compsoc-2be7/join", {
    external: true,
  });
  return "";
};

register({
  name: "whoami",
  fn: whoami,
  help: "Returns the name of the current user",
});
register({ name: "join", fn: join, help: "Join the society" });
