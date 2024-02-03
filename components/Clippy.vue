<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";

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

const leftEye = reactive(new Point(262.682, 280.135));
leftEye.name = "leftEye";
const rightEye = reactive(new Point(474.642, 275.742));
rightEye.name = "rightEye";
const tailEnd = reactive(new Point(604.325, 156.203));
tailEnd.speed = 400 / 1000;
tailEnd.name = "tailEnd";
const noseBase = reactive(new Point(20.316, 370.667));
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
    viewBox="0 0 800 800"
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
    <g>
      <path
        :d="`
          M ${tailEnd.x}, ${tailEnd.y}
          C 604.325,  156.203    625.522,  542.948    625.522,  542.948
          c   5.813,  106.056    -84.983,  196.116   -176.892,  201.153
          c -91.91,     5.038   -171.129,  -76.855   -176.942, -182.911
          l -20.348, -371.263
          c  -3.875,  -70.704     42.655, -130.744    103.927, -134.102
          c  61.274,   -3.358    114.088,   51.236    117.963,  121.941
          l  ${noseBase.x}, ${noseBase.y}
          c   1.937,   35.354    -21.328,   65.374    -51.965,   67.053
          c -30.638,    1.679    -57.045,  -25.619    -58.982,  -60.972
          l  -4.858, -154.514
        `"
        style="
          fill: none;
          fill-rule: nonzero;
          stroke: #ae3428;
          stroke-width: 39.95px;
        "
      />
      <circle
        :cx="leftEye.x"
        :cy="leftEye.y"
        r="67.542"
        :fill="eyeColour"
        style="stroke: #ae3428; stroke-width: 37px; stroke-miterlimit: 1.5"
      />
      <circle
        :cx="rightEye.x"
        :cy="rightEye.y"
        r="63.149"
        :fill="eyeColour"
        style="stroke: #ae3428; stroke-width: 37px; stroke-miterlimit: 1.5"
      />
    </g>
  </svg>
</template>
