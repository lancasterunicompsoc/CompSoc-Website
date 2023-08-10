<script setup>
import { ref } from 'vue'

import TerminalBlinker from './TerminalBlinker.vue'
import TerminalHistoryItem from './TerminalHistoryItem.vue'
import TerminalMarker from './TerminalMarker.vue'

import get_command from './commands'
import { cwd } from './commands/filesystem'


const inputBuffer = ref('')
const history = ref([])
const activeLineBuffer = ref('')
const historySelectionOffset = ref(0)

const commandState = ref({})
cwd(commandState.value)


const commands = {
    help: () => 'No commands have been implemented yet',
    join: () => {
        // TODO: redirect to sign up page
        return 'Redirecting to sign up page'
    },

    clear: () => { history.value = []; return false },

    // Calculator
    '+': params => {
        const [a, b, ..._] = params
        return '' + (+a + +b)
    },
    '-': params => {
        const [a, b, ..._] = params
        return '' + (+a - +b)
    },
    '*': params => {
        const [a, b, ..._] = params
        return '' + (+a * +b)
    },
    '/': params => {
        const [a, b, ..._] = params
        return '' + (+a / +b)
    },
}


function handleCommand(command) {
    let [cmd, ...params] = command.split(' ')

    const handler = get_command(cmd.toLowerCase())
    if (handler === undefined)
        return `\`${cmd}\` is not a valid command. Use the \`help\` command to learn more`

    return handler(commandState.value, params)
}


function handleInput(event) {
    const { key } = event

    if (key == 'Tab') return
    event.preventDefault()

    if (key == 'Enter') {
        const command = activeLineBuffer.value.trim()
        if (command !== '') {
            let response = handleCommand(command)
            if (response !== false)
                history.value.push({ input: command, output: response})
        }

        inputBuffer.value = ''
        activeLineBuffer.value = ''
        historySelectionOffset.value = 0

        return
    }
    if (key == 'Backspace') {
        if (inputBuffer.value === '') return
        activeLineBuffer.value = activeLineBuffer.value.slice(0, -1)
        inputBuffer.value = activeLineBuffer.value
        return
    }

    if (key == 'ArrowUp') {
        historySelectionOffset.value++
        const historySelection = history.value[history.value.length - historySelectionOffset.value]
        activeLineBuffer.value = historySelection.input
        return
    }
    if (key == 'ArrowDown') {
        historySelectionOffset.value--
        if (historySelectionOffset.value <= 0) {
            historySelectionOffset.value = 0
            activeLineBuffer.value = inputBuffer.value
        } else {
            const historySelection = history.value[history.value.length - historySelectionOffset.value]
            activeLineBuffer.value = historySelection.input
        }
        return
    }

    if (key.length > 1) {
        console.log(key)
        return
    }

    activeLineBuffer.value += key
    inputBuffer.value = activeLineBuffer.value
}
</script>

<template>
    <code class="terminal edit" @keydown="handleInput" tabindex="0">
        <TerminalHistoryItem v-for="item in history" :input="item.input" :output="item.output" />
        <TerminalMarker :cwd="commandState.filesystem.cwd" /> {{ activeLineBuffer }}<TerminalBlinker />
    </code>
</template>

<style scoped>
    .terminal[disabled] {
        display: none;
    }

    .terminal {
        display: block;
        margin-inline: auto;

        width: 80ch;
        aspect-ratio: 4/3;

        font-family: monospace;

        color: #fff;
        background-color: #000;
    }

    .marker {
        color: red;
    }
</style>

