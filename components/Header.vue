<script setup>
import Logo from './Logo'
</script>

<template>
    <header class="bg-#ddd dark:bg-lightgrey p-8 flex m-0 justify-between items-center">
        <a href="/" >
            <h1 class="font-bold text-2em">
                <Logo />
            </h1>
        </a>
        <nav>
            <ul>
                <li><a href="/about">About Us</a></li>
            </ul>
        </nav>
        <DarkToggle />
    </header>
</template>
