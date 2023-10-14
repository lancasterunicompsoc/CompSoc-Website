import type { CommandHandler, State } from "./registry";
import { register } from "./registry";

export const whoami = (state: State): string => {
  return state.session?.username ?? "anonymous";
};

const join: CommandHandler = (_state, _params) => {
  navigateTo("https://lancastersu.co.uk/groups/compsoc-2be7/join", {
    external: true,
  });
};

register({
  name: "whoami",
  fn: (state, _params, { stdout }) => stdout.writeln(whoami(state)),
  help: "Returns the name of the current user",
});
register({ name: "join", fn: join, help: "Join the society" });
