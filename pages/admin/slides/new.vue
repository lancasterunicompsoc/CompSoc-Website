<script setup lang="ts">
import { upload } from "@vercel/blob/client";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: ["auth-admin"],
});

const router = useRouter();

const { jwt } = storeToRefs(useAuthStore());

const slidesFile = ref();
const name = ref("");
const speaker = ref("");

const isUploading = ref(false);

const fileChanged = async (event: Event) => {
  const { files } = event.target as HTMLInputElement;
  const slides = files?.[0];
  if (!slides) {
    return;
  }
  slidesFile.value = slides;
};

const canSubmit = computed(() => {
  if (!slidesFile || name.value.length === 0 || speaker.value.length === 0) {
    return false;
  }
  return true;
});

const onSubmit = async (event: Event) => {
  if (!canSubmit.value) {
    return;
  }
  const payload: UploadClientPayloadType = {
    Bearer: jwt.value as string,
    body: { name: name.value, speaker: speaker.value },
  };
  isUploading.value = true;
  const blob = await upload(slidesFile.value.name, slidesFile.value, {
    access: "public",
    handleUploadUrl: "/api/upload",
    clientPayload: JSON.stringify(payload),
  });
  isUploading.value = false;
  console.dir(blob);
  router.push("/slides");
};
</script>

<template>
  <main>
    <h1 text-xl font-bold>Upload slides form</h1>
    <form class="grid grid-cols-2 gap-2" @submit.prevent="onSubmit">
      <label for="nameinput">Name of the slides</label>
      <input
        type="text"
        v-model="name"
        id="nameinput"
        class="dark:text-black"
      />
      <label for="speakerinput">Name of the speaker</label>
      <input
        type="text"
        v-model="speaker"
        id="speakerinput"
        class="dark:text-black"
      />
      <label for="slideupload"> Slides file </label>
      <input type="file" name="file" @change="fileChanged" id="slideupload" />
      <button btn type="submit" :disabled="!canSubmit">Submit</button>
    </form>
    <Spinner :isLoading="isUploading" />
  </main>
</template>
