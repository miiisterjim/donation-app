<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  name: string
}>()

const message = ref('')

onMounted(async () => {
  const res = await fetch(`/api/message?name=${props.name}`)
  const data = await res.json()
  message.value = data.message
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ message }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
