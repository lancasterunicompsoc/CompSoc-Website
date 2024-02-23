<script setup lang="ts">
import { asyncComputed } from "@vueuse/core";

import { validate } from "~/utils/sgd";

const props = defineProps<{ content: string }>();
const emit = defineEmits<{ validate: [isOk: boolean] }>();

const errors = asyncComputed(async () => await validate(props.content));

watch(
  () => errors.value,
  () => {
    emit("validate", errors.value.filter(e => !e.acceptable).length === 0);
  },
);
</script>

<template>
  <ul>
    <template v-for="(err, i) of errors" :key="i">
      <li :data-acceptable="err.acceptable ? 'true' : 'false'">
        <template v-if="err.type === 'link'">
          Unsafe URL: {{ err.domain }}
        </template>
        <template v-else-if="err.type === 'spelling'">
          Incorrect word
          <span class="sic">{{ err.word }}</span>
          at {{ err.index }}. Did you mean
          <ul class="suggestions">
            <template v-for="s in err.suggestions" :key="s">
              <li>{{ s }}</li>
            </template>
          </ul>
        </template>
        <template v-else-if="err.type === 'grammar'">
          Grammar error at {{ err.index }}
        </template>
        <template v-else-if="err.type === 'general'">
          Error ar position {{ err.index }}. {{ err.message }}
        </template>
        <template v-else>{{ err.type }} - {{ err.index }}</template>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.sic {
  font-style: oblique;
}

.suggestions {
  margin-left: 1rem;
}
.suggestions li {
  list-style: initial;
  line-height: 0.95;
}

[data-acceptable="false"] {
  color: var(--highlight1Dark)
}
[data-acceptable="true"] {
  opacity: 0.75;
}
</style>
