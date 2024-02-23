<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
import Add from "~/components/events/Add.vue";
import type { EventType } from "~/components/events/utils";

definePageMeta({
  middleware: ["auth-admin"],
});

const router = useRouter();

const { jwt } = storeToRefs(useAuthStore());

const onAdd = async (formValues: Omit<EventType, "id">) => {
  const result = await $fetch("/api/events/add", {
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
    <Add :is-edit="false" @event-added="onAdd" />
  </main>
</template>
