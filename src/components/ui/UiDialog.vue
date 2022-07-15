<template>
  <div
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-gray-900 bg-opacity-50"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <ui-card ref="dialog" class="max-w-xl mx-auto">
        <h3 class="mb-2">{{ props.title }}</h3>
        <p v-if="props.text" class="mb-4">{{ props.text }}</p>
        <ui-button
          :label="props.acceptText ? props.acceptText : 'Ok'"
          :color="props.type"
          :icon="props.type == 'danger' ? 'fa-circle-exclamation' : ''"
          :loading="props.loading"
          class="mr-2"
          @click="emits('onAccept')"
        />
        <ui-button label="cancel" @click="emits('onCancel')" />
      </ui-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

// Components
import UiCard from "@/components/ui/UiCard.vue";
import UiButton from "@/components/ui/UiButton.vue";

interface Props {
  title: string;
  text?: string;
  acceptText?: string;
  loading?: boolean;
  type?: "danger" | "warning" | "primary";
}

const props = defineProps<Props>();

const emits = defineEmits(["onAccept", "onCancel"]);

const dialog = ref(null);

onClickOutside(dialog, () => {
  emits("onCancel");
});
</script>
