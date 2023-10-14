import { EventType } from "~/components/events/utils";

export type State = {
  filesystem: {
    cwd: string;
    previous_cwd: string;
  };
  session: {
    username: string;
  };
  getEvents: () => EventType[] | null
};
export type Params = string[];
export type CommandHandler = (
  state: State,
  params: Params,
) => string | undefined;
type Command = { fn: CommandHandler; help?: string };
export const registry: Record<string, Command> = {};

type registerParams = { name: string; fn: CommandHandler; help?: string };

export function register({ name, fn, help }: registerParams) {
  registry[name] = { fn, help };
}

export function getCommand(name: string) {
  return registry[name]?.fn;
}

export function getHelp(name: string) {
  return registry[name]?.help;
}

export function getAllCommands() {
  return Object.keys(registry);
}
