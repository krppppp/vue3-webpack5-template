<template>
  <div class="app">
    <p
      v-text="msg" />
    <button
      @click="addClickTimes(count)"
      v-text="'Click'" />
    <p
      v-text="`Click ${pluralizeCount}`" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const msg = 'Hello World!';
const count = ref(0);

const pluralizeCount = computed(() => pluralize('time', count));

function pluralize(word, count) {
  const countValue = count.value;

  return `${countValue} ${word}${countValue <= 1 ? '' : 's'}`;
}

function addClickTimes(value) {
  count.value = value + 1
}
</script>
