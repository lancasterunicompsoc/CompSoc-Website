<template>
    <div class="dark:bg-darkgrey bg-#e7e7e7">
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

        color: #484848;
        background-color: #eefbfc;
    }

    .page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    main {
        flex: 1;

        max-width: 60vw;
        margin-inline: auto;
    }

    @media (max-width: 60rem) {
        main {
            max-width: 100vw;
        }
    }
</style>

