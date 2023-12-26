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

const set: CommandHandler = (state, params, { stdout }) => {
  if (params.length < 2) {
    return -1;
  }

  let failedSets = 0;
  for (let i = 0; i + 1 < params.length; i += 2) {
    const key = params[i] as string;
    const value = params[i + 1] as string;
    const oldValue = state.environment[key];
    if (typeof oldValue === "string" || oldValue === undefined) {
      state.environment[key] = value;
    } else if (oldValue.set === undefined) {
      stdout.writeln(`failed to set ${key}`);
      failedSets += 1;
    } else {
      oldValue.set(state, value);
    }
  }
  return failedSets;
};

register({
  name: "whoami",
  fn: (state, _params, { stdout }) => stdout.writeln(whoami(state)),
  help: "Returns the name of the current user",
});
register({ name: "join", fn: join, help: "Join the society" });
register({ name: "set", fn: set });
