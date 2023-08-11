<template>
    <div class="dark:bg-darkgrey dark:text-gray-300 bg-#e7e7e7">
        <NuxtLayout name="default">
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
            Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    main {
        flex: 1;

        max-width: 100vw;
        padding: 1rem 2rem;
    }

    @media (min-width: 30rem) {
        main {
            padding-inline: 0;
            max-width: 36rem;
            margin-inline: auto;
        }
    }

    @media (min-width: 60rem) {
        main {
            max-width: 60vw;
        }
    }
</style>

