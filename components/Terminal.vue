<script setup>
import { ref } from 'vue'

const inputBuffer = ref('')


const commands = {
    echo: params => params.join(' '),
    help: () => 'No commands have been implemented yet',
    info: params => {
        let target = params.join(' ')
        switch (target.toLowerCase()) {
            case 'compsoc':
            case 'lucompsoc':
            case 'computer science society':
                return 'Lancaster University Computer Science Society exists to promote interest in computing and technology among students and wider society.'

            case 'lu':
            case 'lancaster university':
                return 'Lancaster University is a collegiate university 3 miles south of Lancaster.'

            default:
                return `Could not find information for \`${target}\`. Try \`info compsoc\``
        }
    },
    join: () => {
        // redirect to sign up page
        return 'Redirecting to sign up page'
    }
}


function handleCommand(command) {
    let [cmd, ...params] = command.split(' ')

    let handler = commands[cmd.toLowerCase()]
    if (handler === undefined)
        return `\`${cmd}\` is not a valid command. Use the \`help\` command to learn more`

    return handler(params)
}


function handleInput(event) {
    const { key, target } = event

    if (key == 'Tab') return
    event.preventDefault()

    if (key == 'Enter') {
        const command = inputBuffer.value.trim()
        if (command !== '') {
            let response = handleCommand(command)
            if (response)
                target.innerHTML += `<br>${response}`
        }

        inputBuffer.value = ''
        const scope_ids = Object.keys(target.dataset).filter(s => s.startsWith('v-')).map(id => `data-${id}=""`).join(' ')
        target.innerHTML += `<br><span class="marker" ${scope_ids}>&gt;</span>`
        return
    }
    if (key == 'Backspace') {
        if (inputBuffer.value === '') return
        inputBuffer.value = inputBuffer.value.slice(0, -1)
        target.innerHTML = target.innerHTML.slice(0, -1)
        return
    }

    if (key.length > 1)
        return

    if (inputBuffer.value === '')
        target.innerHTML += ' '
    target.innerHTML += key
    inputBuffer.value += key
}
</script>

<template>
    <code class="terminal edit" @keydown="handleInput" tabindex="0">
        <span class="marker">&gt;</span>
    </code>
</template>

<style scoped>
    .terminal[disabled] {
        display: none;
    }

    .terminal {
        display: block;

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

