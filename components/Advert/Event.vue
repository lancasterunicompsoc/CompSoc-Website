<script setup lang="ts">
import "xp.css/dist/XP.css";
import { Event as EventType } from "~/components/events/utils";
import Window from "../Window";
import Iconified from "../Window/Iconified";
import WindowBody from "../Window/Body";
import Titlebar from "../Window/titlebar/Normal";
import { unixAnySpan } from "#imports";

const { event } = defineProps<{ event: EventType }>();

const blurb = ref<HTMLInputElement | null>(null);

onMounted(() => {
  const element = blurb.value;
  if (element === null) return;
  const isOverflown = element.scrollHeight > element.clientHeight;
  if (!isOverflown) return;
  element.classList.add("scroll");
  element.style.setProperty("--height", `${element.scrollHeight * 0.8}px`);
});
</script>

<template>
  <article class="slide">
    <Window>
      <Titlebar>Event!</Titlebar>
      <WindowBody>
        <Iconified src="/img/windows/compsoc.png">
          <h1 class="title mb-2">{{ event.name }}</h1>
        </Iconified>
        <Iconified src="/img/windows/calendar.png">
          {{unixAnySpan(event.unixStartTime,event.unixEndTime)}}
        </Iconified>
        <div class="row">
          <Iconified src="/img/windows/location.png">
            {{ event.location }}
          </Iconified>
          <Iconified src="/img/windows/leader.png">
            {{ event.organizer }}
          </Iconified>
          <Iconified :src="`/img/windows/difficulty_${event.difficulty}.png`">
            {{ event.difficulty }}
          </Iconified>
        </div>
        <fieldset ref="blurb" class="mt-2 py-0 blurb">
          <div class="content">
            {{ event.summary }}
          </div>
        </fieldset>
        <div class="join">
          <button>Join</button>
        </div>
      </WindowBody>
    </Window>
  </article>
</template>

<style scoped>
.slide {
  margin: 10vh 10vw;
}

.blurb {
  height: 30vh;
}

.join {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.scroll {
  --height: 100%;
  overflow-y: hidden;
  position: relative;
}

.scroll .content {
  margin-inline: 8px;
  position: absolute;
  left: 0;

  animation: scroll-up 20s 0s infinite forwards steps(80);
}

@keyframes scroll-up {
  0% {
    top: 100%;
  }

  100% {
    top: calc(-1 * var(--height));
  }
}
</style>
