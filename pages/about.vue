<template>
  <main class="main-container">
    <Card id="society">
      <h2>The Society</h2>
      <p>
        Lancaster University Computer Science Society exists to promote interest
        in computing and technology among students and wider society.
      </p>
    </Card>

    <Card id="exec">
      <h2>The Executive Committee</h2>
      <p>
        The Executive Committee (or the Exec, for short) is responsible for the running of the Society.
        They plan and coordinate events and projects, acquire funding, and generally make the Society function.
      </p>
    </Card>

    <a href="#" class="btn"> Join the society </a>
  </main>
</template>

<style scoped>
.main-container {
  margin: auto;
  /* padding-top: 60px; */
}

/* CARDS */
.cards {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 30px;
}

/*
.card {
  padding: 20px;
  width: 100%;
  min-height: 200px;
  display: grid;
  grid-template-rows: 20px 50px 1fr 50px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  cursor: default;
}
*/
</style>
