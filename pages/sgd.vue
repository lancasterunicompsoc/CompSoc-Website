<script setup lang="ts">
import { validate } from "~/utils/sgd";

const content = ref("");

const errors = asyncComputed(async () => await validate(content.value));
</script>

<template>
  <div class="mx-8">
    <textarea v-model="content" class="text-black"></textarea>
    <ul>
      <template v-for="(err, i) of errors" :key="i">
        <li>
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
  </div>
</template>

<style>
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
</style>
