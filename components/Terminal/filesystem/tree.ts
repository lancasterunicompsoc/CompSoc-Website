/* eslint camelcase: 0 */

import type { State } from "../commands/registry";
import { eventToFile } from "../commands/utils";
import { whoami } from "../commands/session";
import { Entry, EntryType } from "./types";
import systemInfo, { MOTD } from "~/components/Terminal/systemInfo";

function manpage(section: string, page: string): Entry {
  return {
    type: EntryType.file,
    name: `${page}.${section}`,
    content: async (_state: State) =>
      fetch(
        await import(
          `~/components/Terminal/man/man${section}/${page}.${section}.txt`
        ).then(mod => mod.default),
      ).then(res => res.text()),
    executable: false,
  };
}

const MANPAGES: Record<string, string[]> = {
  1: ["cat", "cd", "clear", "ls", "pwd", "set", "which"],
  7: ["man-pages"],
};

const makeHomeDir = (name: string): Entry => ({
  type: EntryType.directory,
  name,
  children: _state =>
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

export const fileTree: Entry = {
  type: EntryType.directory,
  name: "/",
  children: _state => [
    {
      type: EntryType.directory,
      name: "home",
      children: state => {
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
      children: _state => [
        {
          type: EntryType.file,
          name: "motd",
          content: MOTD,
        },
      ],
    },
    {
      type: EntryType.directory,
      name: "usr",
      children: _state => [
        {
          type: EntryType.directory,
          name: "bin",
          children: _state => [
            {
              type: EntryType.file,
              name: "pwd",
              content: "echo $PWD",
              executable: true,
            },
          ],
        },
        {
          type: EntryType.directory,
          name: "lib",
          children: _state => [
            {
              type: EntryType.file,
              name: "os-release",
              content: `
NAME="${systemInfo.os.name}"
VERSION="${systemInfo.os.version} (${systemInfo.os.edition})"
ID=compsoc
VERSION_ID=0
VERSION_CODENAME=""
PRETTY_NAME="CompSoc OS 0 (Terminal Edition)"
DEFAULT_HOSTNAME="compsoc"
HOME_URL="https://compsoc.io/"
VARIANT="Termainl Edition"
VARIANT_ID=terminal
`.trim(),
              executable: true,
            },
          ],
        },
        {
          type: EntryType.directory,
          name: "share",
          children: _state => [
            {
              type: EntryType.directory,
              name: "man",
              children: _state =>
                Object.keys(MANPAGES).map(section => ({
                  type: EntryType.directory,
                  name: `man${section}`,
                  children: _state =>
                    MANPAGES[section]?.map(page => manpage(section, page)) ??
                    [],
                })),
            },
          ],
        },
      ],
    },
  ],
};
