<template>
  <button
    type="submit"
    :disabled="props.loading"
    class="py-[11px] px-4 min-w-max rounded bg-primary text-sm text-white font-bold uppercase tracking-wide cursor-pointer hover:bg-primary-darker focus:outline-none focus:ring focus:ring-primary-lighter transition-colors"
    :class="colorClasses"
  >
    <font-awesome-icon
      v-if="props.icon && !props.loading"
      :icon="props.icon"
      class="mr-2"
    />
    <font-awesome-icon
      v-if="props.loading"
      icon="fa-circle-notch"
      class="mr-2 animate-spin"
    />
    {{ props.loading ? "loading..." : props.label }}
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  label: string;
  loading?: boolean;
  color?: "primary" | "primary-lighter" | "danger" | "warning";
  icon?: string;
}

const props = defineProps<Props>();

const colorClasses = ref("");

switch (props.color) {
  case "primary-lighter":
    colorClasses.value = "bg-primary-lighter hover:bg-primary";
    break;
  case "danger":
    colorClasses.value = "bg-error hover:bg-rose-500";
    break;
  case "warning":
    colorClasses.value = "bg-warning hover:bg-amber-400";
    break;
}
</script>
