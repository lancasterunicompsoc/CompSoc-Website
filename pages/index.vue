<template>
  <main
    class="flex flex-col h-full items-center min-h-[70vh] justify-center text-center text-2xl font-extralight"
  >
    <p class="font-bold">
      The Computer Science Society of Lancaster University
    </p>

    <p>Preparing students to be tech career ready</p>

    <div class="button-container p-2 pl-4">
      <span class="text-2xl">Join LUCompSoc</span>
      <div class="arrow-circle">
        <div class="i-carbon-arrow-right text-white text-2xl"></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.button-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  font-weight: 200;
  color: black;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.button-container:hover {
  transform: scale(1.05);
}

.arrow-circle {
  background-color: #1a123c;
  color: #fff;
  border-radius: 50%;
  --circle-size: 40px;
  width: var(--circle-size);
  height: var(--circle-size);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-left: 15px;
}
</style>
