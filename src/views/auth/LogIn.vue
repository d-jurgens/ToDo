<template>
  <div
    class="flex flex-col w-full min-h-screen justify-center items-center p-8 bg-lightest-gray"
  >
    <h1 class="mb-2">Sign in to your account</h1>
    <p class="mb-8">
      or <router-link to="register">create an account</router-link>
    </p>
    <ui-card>
      <form @submit="onSubmit">
        <ui-text-input name="email" label="Email" type="email" />

        <ui-text-input name="password" label="Password" type="password" />

        <ui-button label="Sign in" :loading="isSubmitting" @click="onSubmit" />
      </form>
    </ui-card>
    <router-link to="forgot-password">Forgot your password?</router-link>
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
