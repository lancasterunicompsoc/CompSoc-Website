export type State = { filesystem: { cwd: string } };
export type Params = string[];
export type CommandHandler = (
  state: State,
  params: Params
) => string | undefined;

const registry: { [key: string]: CommandHandler } = {};

export default function register(name: string, handler: CommandHandler) {
  registry[name] = handler;
}

export function get_command(name: string) {
  return registry[name];
}
