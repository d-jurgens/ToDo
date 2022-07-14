<template>
  <button
    type="submit"
    :disabled="props.loading"
    class="py-1 px-4 rounded bg-primary text-sm text-white font-bold uppercase tracking-wide cursor-pointer hover:bg-primary-darker focus:outline-none focus:ring focus:ring-primary-lighter transition-colors"
  >
    {{ props.loading ? "loading..." : props.label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  loading?: boolean;
}

const props = defineProps<Props>();
</script>
