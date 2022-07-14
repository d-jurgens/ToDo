<template>
  <div
    class="flex flex-col w-full min-h-screen justify-center items-center p-8 bg-lightest-gray"
  >
    <h1 class="mb-2">Reset your password</h1>
    <p class="mb-8">
      back to <router-link to="login">log in page</router-link>
    </p>
    <ui-card>
      <form @submit="onSubmit">
        <ui-text-input
          name="password"
          label="New password"
          type="text"
          :requiered="true"
        />

        <ui-button
          label="Reset password"
          :loading="isSubmitting"
          @click="onSubmit"
        />
      </form>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import UiTextInput from "@/components/ui/UiTextInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiCard from "@/components/ui/UiCard.vue";

const { handleSubmit, isSubmitting } = useForm();

const onSubmit = handleSubmit((values) => {
  const stringValues = JSON.stringify(values);
  console.log(`Form submitted: ${stringValues}`);
});
</script>
