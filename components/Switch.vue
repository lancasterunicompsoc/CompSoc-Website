<!-- shamelessly stolen from vitepress -->
<template>
  <button class="Switch !dark:bg-darkgrey" type="button" role="switch">
    <span class="check">
      <span v-if="$slots.default" class="icon">
        <slot />
      </span>
    </span>
  </button>
</template>

<style scoped>
.Switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid rgba(60, 60, 67, 0.29);
  background-color: #f6f6f7;
  transition: border-color 0.25s;
}

button:focus:not(:focus-visible) {
  outline: none !important;
}

.Switch:hover {
  border-color: #fff;
}

.check {
  position: absolute;
  top: 1px;
  /*rtl:ignore*/
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s;
}

.icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.icon :deep(svg) {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  fill: rgba(60, 60, 67, 0.75);
}

.dark .icon :deep(svg) {
  fill: rgba(60, 60, 67);
  transition: opacity 0.25s;
}
</style>
