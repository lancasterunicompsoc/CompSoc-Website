<script setup lang="ts">
import superjson from "superjson";
import { type SlidesType } from "~/components/slides/Slides.vue";
import { useAuthStore } from "~/stores/auth";

const orderBy = useRouteQuery<"asc" | "desc">("orderBy", "desc", {
  transform: val => (val === "asc" ? "asc" : "desc"), // coerce the value into the acceptable values
});

const queryString = computed(() => {
  const query = new URLSearchParams({
    orderBy: orderBy.value,
  });
  return query.toString();
});

const authStore = useAuthStore();
const slidesData = await useFetch(() => `/api/slides/?${queryString.value}`, {
  headers: { Bearer: authStore.jwt as unknown as string },
  transform: value => {
    return superjson.parse(value as unknown as string) as SlidesType[];
  },
});

const { data, status } = slidesData;
</script>

<template>
  <div class="flex flex-col p-8 items-center">
    <div v-if="authStore.isAdmin">
      <NuxtLink class="btn" to="/admin/slides/new">Upload slides</NuxtLink>
    </div>
    <div v-if="status === 'pending'">Loading...</div>
    <div v-if="status === 'success'">
      <div>
        <span hidden id="orderBy">Filters:</span>
        <select
          aria-labelledby="filterLabel"
          id="orderBy"
          class="bg-transparent"
          v-model="orderBy"
        >
          <option class="bg-[#4d4d4d] text-white" value="desc">
            Newest first
          </option>
          <option class="bg-[#4d4d4d] text-white" value="asc">
            Oldest first
          </option>
        </select>
      </div>
      <ul v-for="slides in data" :key="slides.id">
        <li>
          <Slides :slides="slides" />
        </li>
      </ul>
    </div>
  </div>
</template>
