<template>
  <main class="main-container">
    <Card id="society">
      <h2>The Society</h2>
      <p>
        Lancaster University Computer Science Society exists to promote interest
        in computing and technology among students and wider society.
        Social and educational events are run every week, with beginner and
        advanced topics to cover a wide variety of interests.
        See our <a href="/events">events</a> for more information.
      </p>
    </Card>

    <Card id="exec">
      <h2>The Executive Committee</h2>
      <p>
        The Executive Committee (or the Exec, for short) is responsible for the running of the Society.
        They plan and coordinate events and projects, acquire funding, and generally make the Society function.
        The Exec is voted for by the members, and each role is typically held for a year.
        More information about the Exec can be found in the <a href="constitution">Constitution</a>.
      </p>
    </Card>

    <a href="https://lancastersu.co.uk/groups/compsoc-2be7/join" class="button btn centered"> Join the society </a>
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

.main-container {
  margin: auto;
}

/* CARDS */
.cards {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 30px;
}

</style>
