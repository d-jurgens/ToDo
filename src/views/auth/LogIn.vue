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
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";

// Components
import UiTextInput from "@/components/ui/UiTextInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiCard from "@/components/ui/UiCard.vue";

const router = useRouter();
const { handleSubmit, isSubmitting } = useForm();
const toast = useToast();
const userStore = useUserStore();

/**
 * onSubmit:
 * Log in the user using Firebase Authentication with provided email and password.
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

const onSubmit = handleSubmit(async (values) => {
  try {
    // Sign in to firebase
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    // Add the credentials to the user store
    userStore.$state = {
      displayName: userCredentials.user.displayName,
      email: userCredentials.user.email,
      uid: userCredentials.user.uid,
      emailVerified: userCredentials.user.emailVerified,
    };
    router.push("/");
  } catch {
    // Show a generic error message when something goes wrong while signing in
    toast.error("Somthing went wrong when singing in, please try again");
  }
});
</script>
