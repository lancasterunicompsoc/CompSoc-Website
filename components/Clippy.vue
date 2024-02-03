<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";

const props = defineProps<{ message: string }>();

let running = false;

const eyeColour = ref("#111");

type Vec2 = {
  x: number;
  y: number;
};

class Point {
  target: Vec2;
  current: Vec2;

  speed: number;
  name: string = "";

  constructor(v: Vec2);
  constructor(x: number, y: number);
  constructor(x: Vec2 | number, y: number | undefined = undefined) {
    let target: Vec2;
    if (y !== undefined) {
      target = { x: x as unknown as number, y };
    } else {
      target = x as unknown as Vec2;
    }
    this.target = { ...target };
    this.current = { ...target };

    this.speed = 0.1;
  }

  get x() {
    return this.current.x;
  }

  get y() {
    return this.current.y;
  }

  update(timeStep: number) {
    timeStep = Math.min(timeStep, 60);
    const { x: px, y: py } = this.current;
    const { x: tx, y: ty } = this.target;
    const dx = tx - px;
    const dy = ty - py;
    const theta = Math.atan2(dy, dx);
    if (Math.abs(dx) > 0) {
      const vx = this.speed * Math.cos(theta);
      this.current.x += vx * timeStep;
    }
    if (Math.abs(dy) > 0) {
      const vy = this.speed * Math.sin(theta);
      this.current.y += vy * timeStep;
    }
  }

  snap() {
    this.current = { ...this.target };
  }

  move(target: Vec2) {
    this.target = target;
  }

  moveRelative(by: Vec2) {
    this.target.x += by.x;
    this.target.y += by.y;
  }
}

const leftEye = reactive(new Point(263, 280));
leftEye.name = "leftEye";
const rightEye = reactive(new Point(475, 276));
rightEye.name = "rightEye";
const tailEnd = reactive(new Point(604, 156));
tailEnd.speed = 400 / 1000;
tailEnd.name = "tailEnd";
const noseBase = reactive(new Point(20, 371));
noseBase.name = "noseBase";

function lookLeft() {
  leftEye.moveRelative({ x: -40, y: 35 });
  rightEye.moveRelative({ x: -40, y: 35 });
  setTimeout(lookCenter, 500);
}

function lookCenter() {
  leftEye.moveRelative({ x: 40, y: -35 });
  rightEye.moveRelative({ x: 40, y: -35 });
  setTimeout(lookLeft, 500);
}

function tailRight() {
  tailEnd.moveRelative({ x: 75, y: 25 });
  setTimeout(tailCenter, 200);
}

function tailCenter() {
  tailEnd.moveRelative({ x: -75, y: -25 });
  setTimeout(tailRight, 200);
}

function noseUpPart() {
  noseBase.moveRelative({ x: 0, y: -5 });
  setTimeout(noseDown, 745);
}

function noseUp() {
  noseBase.moveRelative({ x: 0, y: -25 });
  setTimeout(noseDown, 745);
}

function noseDown() {
  noseBase.moveRelative({ x: 0, y: 25 });
  setTimeout(noseUp, 745);
}

let lastDraw: number | undefined;
function draw(timeStamp: number) {
  if (!running) {
    lastDraw = undefined;
    return;
  }
  if (lastDraw === undefined) {
    lastDraw = timeStamp;
    window.requestAnimationFrame(draw);
    return;
  }

  const frameTime = timeStamp - lastDraw;

  leftEye.update(frameTime);
  rightEye.update(frameTime);
  tailEnd.update(frameTime);
  noseBase.update(frameTime);

  lastDraw = timeStamp;
  window.requestAnimationFrame(draw);
}

function onFocus() {
  leftEye.snap();
  rightEye.snap();
  tailEnd.snap();
  noseBase.snap();
}

onMounted(() => {
  running = true;
  setTimeout(() => {
    lookCenter();
    tailRight();
    noseUpPart();
  }, 250);
  draw(0);
  window.addEventListener("focus", onFocus);
});
onUnmounted(() => {
  running = false;
  window.removeEventListener("focus", onFocus);
});
</script>

<template>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 800 1500"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    xmlns:serif="http://www.serif.com/"
    style="
      fill-rule: evenodd;
      clip-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
    "
  >
    <g transform="translate(-75 0)">
      <g transform="scale(0.75) translate(150 -15)">
        <path
          d="M1044 145c0-60-49-110-110-110H94C34 35-16 85-16 145v221c0 61 50 110 110 110h580L542 797l272-321h120c61 0 110-49 110-110V145Z"
          style="fill: #ddd; stroke: #ae3428; stroke-width: 37px"
        />
        <foreignObject
          x="25"
          y="100"
          width="1000"
          height="300"
          class="clippy-say"
        >
          <p xmlns="http://www.w3.org/1999/xhtml">{{ message }}</p>
        </foreignObject>
      </g>
      <g transform="translate(0 500)">
        <path
          :d="`
          M ${tailEnd.x}, ${tailEnd.y}
          C 604,  156    626,  543    626,  543
          c   7,  106    -85,  196   -177,  201
          c -93,    5   -171,  -77   -177, -183
          l -20, -371
          c  -5,  -71     43, -131    104, -134
          c  61,   -3    114,   51    118,  122
          l  ${noseBase.x}, ${noseBase.y}
          c   2,   35    -21,   65    -52,   67
          c -31,    2    -57,  -26    -59,  -61
          l  -5, -155
        `"
          style="
            fill: none;
            fill-rule: nonzero;
            stroke: #ae3428;
            stroke-width: 40px;
          "
        />
        <circle
          :cx="leftEye.x"
          :cy="leftEye.y"
          r="68"
          :fill="eyeColour"
          style="stroke: #ae3428; stroke-width: 37px; stroke-miterlimit: 1.5"
        />
        <circle
          :cx="rightEye.x"
          :cy="rightEye.y"
          r="63"
          :fill="eyeColour"
          style="stroke: #ae3428; stroke-width: 37px; stroke-miterlimit: 1.5"
        />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.clippy-say {
  fill: #000;
  color: black;
  font: 64px sans-serif;
  white-space: pre-line;
}
</style>
