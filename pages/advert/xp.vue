<script setup lang="ts">
import "~/utils/array";
import { getAllEvents } from "~/components/events/utils";
import { SlideLayout, SlideType } from "~/components/Advert/types";
import StateMachine, { State } from "~/utils/advert";

const MIN_WINDOW_LENGTH = 10000;
const POST_WINDOW_DELAY = MIN_WINDOW_LENGTH / 5;

const MINIMUM_SLIDES = 5;
const placeholderSlides = [
  {
    layout: SlideLayout.card,
    millis: 100,
    data: {
      title: "Placeholder",
      image: "https://placehold.co/1000x1000",
    },
  },
];

const BOUNCE_SLIDE = {
  layout: SlideLayout.bounce,
  millis: 7500,
  data: "/img/windows/compsoc.webp",
};

definePageMeta({
  layout: "advert",
});

function padSlides() {
  if (slides.length < MINIMUM_SLIDES) {
    const toInsert = MINIMUM_SLIDES - slides.length;
    for (let i = 0; i < toInsert; i++) {
      slides.push(
        placeholderSlides[i % placeholderSlides.length] as unknown as SlideType,
      );
    }
  }
}

async function loadSlides(): Promise<SlideType[]> {
  return getAllEvents({
    weeks: 2,
  }).then(events =>
    events.map(event => ({
      data: event,
      layout: SlideLayout.event,
      millis: MIN_WINDOW_LENGTH + POST_WINDOW_DELAY,
    })),
  );
}

let slides = await loadSlides();
padSlides();

const currentTime = useDateFormat(useNow(), "hh:mm A");

const slideIndex = ref<number>(0);
const currentSlide = ref<SlideType | null>(null);
const displaySlide = ref<SlideType | null>(null);

const stateMachine = new StateMachine();

function updateSlide() {
  const state = stateMachine.next();

  switch (state) {
    case State.bounce:
      currentSlide.value = BOUNCE_SLIDE;
      break;

    case State.bluescreen:
      currentSlide.value = null;
      break;

    case State.window:
      slideIndex.value++;
      if (slideIndex.value >= slides.length) {
        slideIndex.value = 0;
        loadSlides()
          .then(s => (slides = s))
          .then(padSlides);
      }
      currentSlide.value = slides[slideIndex.value] as unknown as SlideType;
      useTimeoutFn(
        () => (displaySlide.value = null),
        Math.max(currentSlide.value?.millis - POST_WINDOW_DELAY ?? 0, 0),
      );
      break;
  }

  displaySlide.value = currentSlide.value;
  useTimeoutFn(updateSlide, currentSlide?.value?.millis ?? 0);
}

updateSlide();

useTimeoutFn(() => window.location.reload(), 1000 * 3600 * 3);
</script>

<template>
  <div class="banner">
    <div class="icons">
      <div class="icon">
        <img src="/img/windows/recycle-bin.png" />
        <span>Recycle Bin</span>
      </div>
      <div class="icon">
        <img src="/img/windows/my-computer.png" />
        <span>My Computer</span>
      </div>
      <div class="icon">
        <img src="/img/windows/compsoc.webp" />
        <span>compsoc.io</span>
      </div>
    </div>
    <template v-if="displaySlide">
      <div class="advert">
        <Advert :slide="displaySlide" />
      </div>
    </template>
    <div class="taskbar">
      <img src="/img/windows/start.png" />
      <div class="launchers"></div>
      <div class="status a">
        <p class="clock">
          {{ currentTime }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  width: 100vw;
  height: 100vh;

  position: relative;
  overflow: hidden;

  font-size: 48px;

  background-image: url(/img/windows/bliss.webp);
  background-repeat: no-repeat;
  background-size: cover;
}

.icons {
  position: absolute;
  inset: 0.5em;

  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(15, 1fr);
  grid-auto-flow: column;
  gap: 0.5em;
}

.icon {
  font-size: 0.25em;
  font-family: "Pixelated MS Sans Serif";
  color: white;
}

.icon img {
  width: 4em;
  margin-bottom: 0.25em;
  image-rendering: pixelated;
}

.advert {
  position: relative;
  z-index: 10;
}

.taskbar {
  width: 100vw;

  display: flex;
  align-items: stretch;

  position: absolute;
  left: 0;
  bottom: 0;

  background-image: linear-gradient(
    180deg,
    #0997ff,
    #0053ee 8%,
    #0050ee 40%,
    #06f 88%,
    #06f 93%,
    #005bff 95%,
    #003dd7 96%,
    #003dd7
  );
}

.taskbar > * {
  display: inline-block;
}

.taskbar .launchers {
  flex-grow: 999;
}

.taskbar .status {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  padding-right: 0.75rem;
  margin-left: auto;
  margin-right: 0;

  font-size: 24px;
  border-left: 2px solid #0003;

  background: linear-gradient(
      to bottom,
      #1297ed 0%,
      #1cc8f7 9%,
      #1297ed 18%,
      #1582da 85%,
      #095bc9 100%
    )
    center/cover no-repeat;
  box-shadow: 0px 5px 10px #14a5f0 inset;
}

.taskbar .status > * {
  margin-left: 0.75rem;
}

.taskbar .clock {
  color: #fff;
  font-size: 12px;
  margin-block: auto;
  font-family: "Pixelated MS Sans Serif";
}
</style>
