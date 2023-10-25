import { whoami } from "../commands/session";
import type { State } from "../commands/registry";
import { eventToFile } from "../commands/utils";
import { Entry, EntryType } from "./types";
import { MOTD } from "~/components/Terminal/systemInfo";

const makeHomeDir = (name: string): Entry => ({
  type: EntryType.directory,
  name,
  children: (_: State) =>
    [
      {
        type: EntryType.directory,
        name: "events",
        children: (state: State) => {
          const events = state.getEvents();
          if (events) {
            return events.map(e => eventToFile(e));
          }
          return [];
        },
      },
      name === "anonymous"
        ? null
        : {
            type: EntryType.file,
            name: ".wake-up",
            content: "The Matrix has you...\nFollow the white rabbit.\n",
          },
    ].filter(c => c !== null) as Entry[],
});

const fileTree: Entry = {
  type: EntryType.directory,
  name: "/",
  children: (_: State) => [
    {
      type: EntryType.directory,
      name: "home",
      children: (state: State) => {
        const iAm = whoami(state);
        const children = [makeHomeDir(iAm)];
        if (iAm !== "anonymous") {
          children.push(makeHomeDir("anonymous"));
        }
        return children;
      },
    },
    {
      type: EntryType.directory,
      name: "etc",
      children: (_state: State) => [
        {
          type: EntryType.file,
          name: "motd",
          content: MOTD,
        },
        {
          type: EntryType.file,
          name: "init.sh",
          content: "echo Hello, world!",
        }
      ],
    },
  ],
};
export default fileTree;
