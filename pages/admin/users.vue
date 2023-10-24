<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: ["auth-admin"],
});

const authStore = useAuthStore();
const { pending, data, status, refresh } = useFetch("/api/users", {
  headers: { Bearer: authStore.jwt as unknown as string },
});

function toggleBan(id: string) {
  if (!authStore.jwt) {
    return;
  }
  $fetch("/api/users/ban", {
    method: "POST",
    body: { id },
    headers: { Bearer: authStore.jwt as unknown as string },
  })
    .then(() => refresh())
    .catch(console.error);
}

function changeRole(event: Event) {
  if (!authStore.jwt) {
    return;
  }
  const el = event.target as HTMLSelectElement;
  const { id, value: role } = el;
  $fetch("/api/users/role", {
    method: "POST",
    body: { id, role },
    headers: { Bearer: authStore.jwt },
  })
    .then(() => refresh())
    .catch(console.error);
}
</script>

<template>
  <div class="m-8">
    <h1 class="text-3xl">Users</h1>
    <div v-if="pending === true">Loading users...</div>
    <table v-if="status === 'success' && data" class="mt-8 dark:bg-#222">
      <thead class="dark:bg-#222">
        <tr>
          <th class="dark:bg-#222">ID</th>
          <th class="dark:bg-#222">Name</th>
          <th class="dark:bg-#222">Username</th>
          <th class="dark:bg-#222">Role</th>
          <th class="dark:bg-#222">Is banned</th>
          <th class="dark:bg-#222">Verified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in data" :key="user.id">
          <td class="dark:bg-#222">
            {{ user.id }}
          </td>
          <td class="dark:bg-#222">
            {{ user.displayName }}
          </td>
          <td class="dark:bg-#222">
            {{ user.username }}
          </td>
          <td class="dark:bg-#222">
            <select
              :id="user.id"
              v-model="user.role"
              class="text-black"
              @change="changeRole"
            >
              <option value="USER">USER</option>
              <option value="PRIVILEGED">PRIVILEGED</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </td>
          <td class="dark:bg-#222">
            <input
              type="checkbox"
              :checked="user.banned"
              @change="() => toggleBan(user.id)"
            />
          </td>
          <td class="dark:bg-#222">
            <input
              type="checkbox"
              :checked="!!user.suVerified"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table,
th,
td {
  padding: 1em;
  border: 1px solid #111;
  background-color: rgb(221, 221, 221);
}
</style>
