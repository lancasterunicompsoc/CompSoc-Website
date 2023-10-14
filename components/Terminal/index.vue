<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import TerminalBlinker from "./TerminalBlinker.vue";
import type { State } from "./commands/registry";
import systemInfo from "./systemInfo";
import "./commands/";
import { cwd } from "./commands/filesystem";
import { getAllCommands, register, getCommand } from "./commands/registry";
import { useAuthStore } from "~/stores/auth";
import { useEventStore } from "~/stores/event";

const MOTD = `The programs included with ${systemInfo.os.name} are free software.
${systemInfo.os.name} comes with ABSOLUTELY NO WARRANTY, to the extent permitted by applicable law.

To get started, type \`help\` to list available commands. ${systemInfo.os.name} is a best-faith implementation of Posix, but may not be entirely Posix-compliant.
`;

const characterBuffer = ref<string>("");
const commandHistory = ref<string[]>([]);
const inputBuffer = ref(""); // inputBuffer holds the user input
const activeLineBuffer = ref(""); // while activeLineBuffer holds the contents of the current line, they can be different when a user is scrubbing through the history
const historySelectionOffset = ref(0);

const coderef = ref<HTMLElement | null>(null);

const { focused } = useFocus(coderef, { initialValue: true });

const eventsStore = useEventStore();
const { events } = storeToRefs(eventsStore);
const authStore = useAuthStore();

const username = authStore.payload?.username ?? "anonymous";

onMounted(() => eventsStore.getAllEvents());
const getEvents = () => eventsStore.events;

// TODO: We could think about persisting the state in the future
const commandState = ref<State>({
  filesystem: {
    cwd: `/home/${username}`,
    previous_cwd: `/home/${username}`,
  },
  session: {
    username,
  },
  getEvents,
});

watch(
  () => authStore.payload?.username,
  (username) => {
    commandState.value.session.username = username ?? "anonymous";
    handleCommand("cd");
  }
);

const stdin = {
  read(_n?: number): string {
    const char = inputBuffer.value[0];
    inputBuffer.value = inputBuffer.value.substring(1);
    return char ?? "";
  }
};
const stdout = {
  write(data: string): number { characterBuffer.value += data; return data.length; },
  writeln(data: string): number { return this.write(data + "\n"); },
};

function handleCommand(command: string): void {
  const [cmd, ...params] = command.split(" ");

  if (!cmd) {
    return;
  }

  const handler = getCommand(cmd.toLowerCase());
  if (handler === undefined) {
    stdout.writeln(`\`${cmd}\` is not a valid command. Use the \`help\` command to learn more`);
    return;
  }

  handler(commandState.value, params, { stdin, stdout });
}

function handleInput(event: KeyboardEvent) {
  const { key } = event;

  event.preventDefault();

  if (key === "Tab") {
    const cmds = getAllCommands();
    const [partialCmd, ...args] = activeLineBuffer.value.trim().split(" ");

    if (!partialCmd || args.length > 0) {
      // we dont wanna autocomplete when the user is supplying arguments or when there is no command
      return;
    }
    const cmdStartsWith = cmds.filter(el => el.startsWith(partialCmd));

    // Doing autocomplete with several options is beyond our scope
    if (cmdStartsWith.length === 1) {
      activeLineBuffer.value = cmdStartsWith[0] as string;
    }
    return;
  }

  if (key === "Enter") {
    const command = activeLineBuffer.value.trim();
    stdout.writeln(activeLineBuffer.value);
    activeLineBuffer.value = "";
    if (command !== "") {
      handleCommand(command);
    }
    commandHistory.value.push(command);

    inputBuffer.value = "";
    historySelectionOffset.value = 0;

    stdout.write(cwd(commandState.value));
    stdout.write("> ");

    // Autoscroll down to the output of the last run command
    // This needs to be done after the next rendercycle, because the output of the last command won't have rendered yet
    nextTick(() => {
      if (coderef.value) {
        coderef.value.scrollTop = coderef.value.scrollHeight;
      }
    });
    return;
  }
  if (key === "Backspace") {
    if (inputBuffer.value === "" && activeLineBuffer.value === "") {
      return;
    }
    activeLineBuffer.value = activeLineBuffer.value.slice(0, -1);
    inputBuffer.value = activeLineBuffer.value;
    return;
  }

  if (key === "ArrowUp") {
    if (commandHistory.value.length === 0) {
      return;
    }
    historySelectionOffset.value++;
    if (historySelectionOffset.value >= commandHistory.value.length) {
      historySelectionOffset.value = commandHistory.value.length;
    }
    const historySelection = commandHistory.value.at(
      -1 * historySelectionOffset.value,
    );
    if (!historySelection) {
      console.error(
        `something went wrong, debug info: offset: ${historySelectionOffset.value}, history length: ${commandHistory.value.length}`,
      );
    }
    activeLineBuffer.value = historySelection ?? "";
    return;
  }

  if (key === "ArrowDown") {
    historySelectionOffset.value--;

    if (historySelectionOffset.value <= 0) {
      historySelectionOffset.value = 0;
      activeLineBuffer.value = inputBuffer.value;
    } else {
      const historySelection = commandHistory.value.at(
        -1 * historySelectionOffset.value,
      );
      activeLineBuffer.value = historySelection ?? "";
    }
    return;
  }

  if (key === "l" && event.ctrlKey) {
    clearScreen();
    return;
  }

  if (key === "Escape") {
    coderef.value?.blur();
    return;
  }

  // Mods
  if (key.length > 1) {
    return;
  }

  activeLineBuffer.value += key;
  inputBuffer.value = activeLineBuffer.value;
}

function clearScreen() {
  characterBuffer.value = `${cwd(commandState.value)}> `;
}

register({
  name: "clear",
  fn: (_state, _params, _io) => {
    // we can't clear it immediately, because the 'clear' command will be drawn on screen AFTER this has run, due to the way the command systems works
    nextTick(clearScreen);
  },
  help: "Clear the screen completely",
});

onMounted(() => {
  stdout.writeln(MOTD);
  stdout.write(cwd(commandState.value));
  stdout.write("> ");
});
</script>

<template>
  <code ref="coderef" class="terminal edit" tabindex="0" @keydown="handleInput">
    {{ characterBuffer }}
    {{ activeLineBuffer }}<TerminalBlinker :focussed="focused" />
  </code>
</template>

<style scoped>
.terminal[disabled] {
  display: none;
}

.terminal {
  --padding: 0.5rem;
  --border-scale: 0.25rem;

  --red: #d12415;

  display: block;
  width: calc(80ch + var(--padding));
  aspect-ratio: 4/3;
  padding-inline: calc(var(--padding));
  padding-block: calc(var(--padding) * 0.75);
  margin: 2rem auto;

  font-family: monospace;
  white-space: pre-line;
  overflow-y: scroll;

  color: #fff;
  background-color: #000;
  box-shadow:
    var(--red) 0 0 0 0,
    var(--red) 0 0 0 0 inset;

  transition: box-shadow 250ms ease-in-out;

  cursor: text;
}

.terminal:focus {
  box-shadow:
    var(--red) 0 0 var(--border-scale) calc(var(--border-scale) / 2),
    var(--red) 0 0 calc(var(--border-scale) / 2) calc(var(--border-scale) / 4)
      inset;
  outline: none;
}

.marker {
  color: var(--red);
}

@media (max-width: 80ch) {
  .terminal {
    display: none;
  }
}
</style>
