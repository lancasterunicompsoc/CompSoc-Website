<script setup lang="ts">
const route = useRoute()

await navigateTo(
  `https://github.com/LUCompSoc/${route.params.repo}`,
  {
    external: true
  }
)
</script>

