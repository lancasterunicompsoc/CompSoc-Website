<script setup lang="ts">
import { ref } from "vue";

import TerminalBlinker from "./TerminalBlinker.vue";
import TerminalHistoryItem from "./TerminalHistoryItem.vue";
import TerminalMarker from "./TerminalMarker.vue";
import type { State } from "./commands/registry";

import get_command from "./commands";
import { cwd } from "./commands/filesystem";
import register from "./commands/registry";

interface HistoryItem {
  input: string;
  output: string | undefined;
  cwd: string;
}

const inputBuffer = ref("");
const history = ref<HistoryItem[]>([]);
const activeLineBuffer = ref("");
const historySelectionOffset = ref(0);

// TODO: We could think about persisting the state in the future
// I would prefer if we didnt hardcode the initial value and instead called `userHome`,
// but the issue is that it depends on this variable, hence introducing a circular dependency
const commandState = ref<State>({ filesystem: { cwd: "/home/anonymous" } });

function handleCommand(command: string): string | undefined {
  let [cmd, ...params] = command.split(" ");

  if (!cmd) return ``;
  const handler = get_command(cmd.toLowerCase());
  if (handler === undefined)
    return `\`${cmd}\` is not a valid command. Use the \`help\` command to learn more`;

  return handler(commandState.value, params);
}

function handleInput(event: KeyboardEvent) {
  const { key } = event;

  if (key === "Tab") return;
  event.preventDefault();

  if (key === "Enter") {
    const command = activeLineBuffer.value.trim();
    const pwd = cwd(commandState.value, []);
    let response;
    if (command !== "") {
      response = handleCommand(command);
    }
    history.value.push({ input: command, output: response, cwd: pwd });

    inputBuffer.value = "";
    activeLineBuffer.value = "";
    historySelectionOffset.value = 0;

    return;
  }
  if (key === "Backspace") {
    if (inputBuffer.value === "") return;
    activeLineBuffer.value = activeLineBuffer.value.slice(0, -1);
    inputBuffer.value = activeLineBuffer.value;
    return;
  }

  if (key === "ArrowUp") {
    if (history.value.length === 0) return;
    historySelectionOffset.value++;
    if (historySelectionOffset.value >= history.value.length) {
      historySelectionOffset.value = history.value.length;
    }
    const historySelection = history.value.at(
      -1 * historySelectionOffset.value
    );
    if (!historySelection) {
      console.error(
        `something went wrong, debug info: offset: ${historySelectionOffset.value}, history length: ${history.value.length}`
      );
    }
    activeLineBuffer.value = historySelection?.input ?? "";
    return;
  }

  if (key === "ArrowDown") {
    historySelectionOffset.value--;

    if (historySelectionOffset.value <= 0) {
      historySelectionOffset.value = 0;
      activeLineBuffer.value = inputBuffer.value;
    } else {
      const historySelection = history.value.at(
        -1 * historySelectionOffset.value
      );
      activeLineBuffer.value = historySelection?.input ?? "";
    }
    return;
  }

  if (key === "l" && event.ctrlKey) {
    clearScreen();
    return;
  }

  if (key.length > 1) {
    console.log(key);
    return;
  }

  activeLineBuffer.value += key;
  inputBuffer.value = activeLineBuffer.value;
}

function clearScreen() {
  history.value = [];
}

register("clear", (state, params) => {
  // HACK
  // we can't clear it immediately, because the 'clear' command will be drawn on screen AFTER this has run, due to the way the command systems works
  setTimeout(clearScreen, 50);
  return "";
});
</script>

<template>
  <code class="terminal edit" @keydown="handleInput" tabindex="0">
    <TerminalHistoryItem
      v-for="item in history"
      :input="item.input"
      :output="item.output"
      :cwd="item.cwd"
    />
    <TerminalMarker :cwd="commandState.filesystem.cwd" /> {{ activeLineBuffer
    }}<TerminalBlinker />
  </code>
</template>

<style scoped>
.terminal[disabled] {
  display: none;
}

.terminal {
  --padding: 0.5rem;
  --border-scale: 0.25rem;

  --red: #e20025;

  display: block;
  width: calc(80ch + var(--padding));
  aspect-ratio: 4/3;
  padding-inline: calc(var(--padding));
  padding-block: calc(var(--padding) * 0.75);
  margin: 2rem auto;

  font-family: monospace;
  white-space: pre-line;

  color: #fff;
  background-color: #000;
  box-shadow: var(--red) 0 0 0 0, var(--red) 0 0 0 0 inset;

  transition: box-shadow 250ms ease-in-out;
}

.terminal:focus {
  box-shadow: var(--red) 0 0 var(--border-scale) calc(var(--border-scale) / 2),
    var(--red) 0 0 calc(var(--border-scale) / 2) calc(var(--border-scale) / 4)
      inset;
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
