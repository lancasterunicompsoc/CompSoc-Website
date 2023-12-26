import type { StdIO } from "../stdio";

import { EventType } from "~/components/events/utils";

export type EnvironmentVariable =
  | string
  | {
      get: (state: State) => string;
      set?: (state: State, value: string) => void;
    };

export type State = {
  environment: Record<string, EnvironmentVariable>;
  filesystem: {
    cwd: string;
    previous_cwd: string;
    path: string[];
  };
  session: {
    username: string;
  };
  getEvents: () => EventType[] | null;
};
export type Params = string[];
export type CommandHandler = (state: State, params: Params, io: StdIO) => void;
type Command = { fn: CommandHandler; help?: string };
export const registry: Record<string, Command> = {};

type registerParams = { name: string; fn: CommandHandler; help?: string };

export function register({ name, fn, help }: registerParams) {
  registry[name] = { fn, help };
}

export function getCommand(name: string): CommandHandler | undefined {
  return registry[name]?.fn;
}

export function getHelp(name: string) {
  return registry[name]?.help;
}

export function getAllCommands() {
  return Object.keys(registry);
}
