<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
import Add from "~/components/events/Add.vue";
import type { EventType } from "~/components/events/utils";

definePageMeta({
  middleware: ["auth-admin"],
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { data } = await useFetch(`/api/events/event?id=${id}`);
const event = computed(() => {
  if (data.value === null) {
    router.replace("/events");
  }
  return (data.value as EventType);
});

const { jwt } = storeToRefs(useAuthStore());

const onAdd = async (formValues: EventType) => {
  const result = await $fetch("/api/events/update", {
    method: "POST",
    headers: { Bearer: jwt.value as unknown as string },
    body: formValues,
  });

  if (!result.ok) {
    console.error(result);
    router.push("/events");
    return;
  }
  const { id } = result;
  router.push(`/events/${id}`);
};
</script>

<template>
  <main>
    <Add :is-edit="true" @event-edited="onAdd" :form-values="event" />
  </main>
</template>
