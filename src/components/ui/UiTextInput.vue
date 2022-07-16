<template>
  <label :for="props.name">{{ props.label }}</label>
  <div>
    <input
      :type="props.type"
      v-model="value"
      v-on="validationListeners"
      :name="props.name"
      class="block w-full p-2 rounded border border-light-gray focus:border-light-gray focus:outline-none focus:ring focus:ring-primary-lighter"
      :class="errorMessage ? 'ring ring-error focus:ring-error' : ''"
    />
    <span class="text-error text-sm">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useField } from "vee-validate";
import * as yup from "yup";

interface Props {
  name: string;
  type: "password" | "email" | "text";
  label: string;
  required?: boolean;
}

const props = defineProps<Props>();

let rules: string | object = "";

switch (props.type) {
  case "password":
    rules = yup.string().required();
    break;
  case "email":
    rules = yup.string().email().required();
    break;
  case "text":
    rules = yup.string();
    break;
}

if (props.required) {
  rules = yup.string().required();
}

const { value, errorMessage, handleChange } = useField(props.name, rules, {
  validateOnValueUpdate: false,
});

const validationListeners = computed(() => {
  // If the field is valid or have not been validated yet
  // lazy
  if (!errorMessage.value) {
    return {
      blur: handleChange,
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
