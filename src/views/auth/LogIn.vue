<template>
  <div
    class="flex flex-col w-full min-h-screen justify-center items-center p-8 bg-lightest-gray"
  >
    <h1 class="mb-2">Sign in to your account</h1>
    <p class="mb-8">or <a href="#">create an account</a></p>
    <ui-card>
      <form @submit="onSubmit">
        <ui-input name="email" label="Email" type="email" />

        <ui-input name="password" label="Password" type="password" />

        <ui-button label="Sign in" :disabled="isSubmitting" @click="onSubmit" />
      </form>
    </ui-card>
    <a href="#">Forgot your password?</a>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import UiInput from "@/components/ui/UiInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiCard from "@/components/ui/UiCard.vue";

const { handleSubmit, isSubmitting } = useForm();

const onSubmit = handleSubmit((values) => {
  const stringValues = JSON.stringify(values);
  console.log(`Form submitted: ${stringValues}`);
});
</script>
