
<template>
    <main class="main-container">
        <Terminal />

        <p class="info-line">
            Lancaster University Computer Science Society
            exists to promote interest in computing and
            technology among students and wider society.
        </p>

        <a href="#" class="button block">
            Join the society
        </a>
    </main>
</template>

<style scoped>
    /* HEADING */

    .heading {
        text-align: center;
    }

    .heading__title {
        font-weight: 600;
        font-size: 40px;
    }

    .gradient__text {
        background: linear-gradient(to right, #7bceb6 10%, #12a87b 40%, #0FCF97 60%, #7bceb6 90%);
        background-size: 200% auto;
        color: #000;
        background-clip: text;
        text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 1s linear infinite;
    }

    @keyframes shine {
        to {
            background-position: 200% center;
        }
    }

    .heading__credits {
        color: #888888;
        font-size: 25px;
        transition: all 0.5s;
    }

    .heading__credits a {
        text-decoration: underline;
    }

    /* CARDS */
    .cards {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin-top: 30px;
    }

    .card {
        padding: 20px;
        width: 100%;
        min-height: 200px;
        display: grid;
        grid-template-rows: 20px 50px 1fr 50px;
        border-radius: 10px;
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
        transition: all 0.2s;
        cursor: default;
    }

    .card:hover {
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
        transform: scale(1.01);
    }

    .card__link {
        position: relative;
        text-decoration: underline;
        color: rgba(255, 255, 255, 0.9);
    }

    .card__title {
        font-weight: 400;
        color: #ffffff;
        font-size: 30px;
    }

    .card__body {
        grid-row: 2/4;
    }

    .card__body p {
        color: #ffffff;
    }

    .card__action {
        grid-row: 5/6;
        align-self: center;
        display: flex;
        gap: 20px
    }

    /* RESPONSIVE */

    @media (max-width: 1600px) {
        .cards {
            justify-content: center;
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
    }
</style>
