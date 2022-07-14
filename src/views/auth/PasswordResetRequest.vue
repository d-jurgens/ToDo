<template>
  <div
    class="flex flex-col w-full min-h-screen justify-center items-center p-8 bg-lightest-gray"
  >
    <h1 class="mb-2">Reset your password</h1>
    <p class="mb-8">
      back to <router-link to="login">log in page</router-link>
    </p>
    <ui-card v-if="!requestSuccessfull">
      <form @submit="onSubmit">
        <ui-text-input name="email" label="Email" type="email" />

        <ui-button
          label="Reset password"
          :loading="isSubmitting"
          @click="onSubmit"
        />
      </form>
    </ui-card>
    <ui-card v-if="requestSuccessfull" class="max-w-xl">
      <p>
        A password reset request has been sent, you will receive an email with
        instructions. Please check your spam folder if you haven't received any
        email.
      </p>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { auth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "vue-toastification";

// Components
import UiTextInput from "@/components/ui/UiTextInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiCard from "@/components/ui/UiCard.vue";

const toast = useToast();

const { handleSubmit, isSubmitting } = useForm();

const requestSuccessfull = ref(false);

/**
 * onSubmit:
 * Send a password reset email, show an error if it fails.
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

const onSubmit = handleSubmit(async (values) => {
  try {
    // Wait for Firebase to send the email, it will throw an error if it fails
    await sendPasswordResetEmail(auth, values.email);

    // Set the requestSuccessfull ref to true to hide the form and show a success message.
    requestSuccessfull.value = true;
  } catch (error) {
    // Show an error if it fails
    toast.error(
      "Somthing went wrong when sending the password reset email" + error
    );
  }
});
</script>
