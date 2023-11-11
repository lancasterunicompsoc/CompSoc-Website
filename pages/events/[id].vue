<script setup lang="ts">
import Event from "~/components/events/Event.vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id as unknown as string;

const { data } = await useFetch(`/api/events/event?id=${id}`, {
  onResponse: ({ response }) => {
    if (response.status === 204) {
      router.replace("/events");
    }
  },
  onRequestError: ({ request, response }) => {
    console.error(
      "[fetch response error]",
      request,
      response!.status,
      response!.body,
    );
    router.push("/events");
  },
});
</script>

<template>
  <main v-if="data">
    <ClientOnly>
      <Event :event="data" :is-full-size="true" />
    </ClientOnly>
  </main>
</template>
