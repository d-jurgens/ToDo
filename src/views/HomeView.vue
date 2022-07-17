<template>
  <main class="max-w-3xl mx-auto px-4 py-10">
    <create-item />
    <index-items />
  </main>
</template>

<script setup lang="ts">
// Components
import CreateItem from "@/components/todo/CreateItem.vue";
import IndexItems from "@/components/todo/IndexItems.vue";
</script>
