<template>
    <span class="blinker">█ </span>
</template>

<style scoped>
    .blinker {
        color: red;
        animation: blink 750ms linear alternate infinite;
    }

    @keyframes blink {
        0% {
            opacity: 0%;
        }
        35% {
            opacity: 0%;
        }
        65% {
            opacity: 100%;
        }
        100% {
            opacity: 100%;
        }
    }
</style>

