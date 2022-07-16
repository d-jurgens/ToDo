<template>
  <label v-if="label" :for="name">{{ label }}</label>
  <div>
    <input
      :type="type"
      v-model="value"
      v-on="validationListeners"
      :name="name"
      class="block w-full p-2 rounded border border-light-gray focus:border-light-gray focus:outline-none focus:ring focus:ring-primary-lighter"
      :class="reactiveClasses"
    />
    <span class="text-error text-sm">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from "vue";
import { useField } from "vee-validate";

interface Props {
  name: string;
  type: "password" | "email" | "text";
  label?: string;
  required?: boolean;
  compact?: boolean;
}

const props = defineProps<Props>();

// Register the field. Rules set to `undefined` because they are set by useForm.
const { value, errorMessage, handleChange } = useField(
  toRef(props, "name"),
  undefined,
  {
    validateOnValueUpdate: false,
  }
);

// Reactive classes
const reactiveClasses = ref("");

if (props.compact) {
  reactiveClasses.value = "py-0 ";
}

watch(errorMessage, () => {
  if (errorMessage.value && props.compact) {
    reactiveClasses.value = "ring ring-error focus:ring-error py-0";
  } else if (!errorMessage.value && props.compact) {
    reactiveClasses.value = "py-0";
  } else if (errorMessage.value && !props.compact) {
    reactiveClasses.value = "ring ring-error focus:ring-error";
  } else {
    reactiveClasses.value = "";
  }
});

// Custom validation listener
const validationListeners = computed(() => {
  // If the field is valid or have not been validated yet
  // lazy
  if (!errorMessage.value) {
    return {
      // disable `shouldValidate` on blur when there is no value or error message
      blur: (e: string) => handleChange(e, false),
      change: handleChange,
      // disable `shouldValidate` to avoid validating on input
      input: (e: string) => handleChange(e, false),
    };
  }
  // Aggressive
  return {
    blur: handleChange,
    change: handleChange,
    input: handleChange, // only switched this
  };
});
</script>
