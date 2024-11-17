<template>
  <main class="flex flex-col items-center">
    <Card id="society">
      <h2>The Society</h2>
      <p>
        Lancaster University Computer Science Society exists to promote interest
        in computing and technology among students and wider society. Social and
        educational events are run every week, with beginner and advanced topics
        to cover a wide variety of interests. See our
        <NuxtLink to="/events" class="text-blue-600 dark:text-blue-500">
          events
        </NuxtLink>
        for more information.
      </p>
    </Card>

    <Card id="exec">
      <h2>The Executive Committee</h2>
      <p>
        The Executive Committee (or the Exec, for short) is responsible for the
        running of the Society. They plan and coordinate events and projects,
        acquire funding, and generally make the Society function. The Exec is
        voted for by the members, and each role is typically held for a year.
        More information about the Exec can be found in the
        <NuxtLink to="/constitution" class="text-blue-600 dark:text-blue-500">
          Constitution </NuxtLink
        >.
      </p>
    </Card>

    <Join class="mt-4em" />
  </main>
</template>

<style scoped>
.button {
  background-color: var(--highlight2Light);
  width: fit-content;
  margin: auto;
  padding: 1rem;
  border-radius: 0;
}
</style>
