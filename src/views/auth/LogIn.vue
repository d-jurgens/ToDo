<template>
  <div
    class="max-w-3xl mx-auto px-4 py-10 flex flex-col w-full min-h-screen justify-center items-center bg-lightest-gray"
  >
    <h1 class="mb-2 text-center">Sign in to your account</h1>
    <p class="mb-8">
      or <router-link to="register">create an account</router-link>
    </p>
    <ui-card class="max-w-full">
      <form @submit="onSubmit" class="w-80 max-w-full">
        <div class="mb-4">
          <ui-text-input name="email" label="Email" type="email" />
        </div>
        <div class="mb-4">
          <ui-text-input name="password" label="Password" type="password" />
        </div>
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
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";
import * as yup from "yup";

// Components
import UiTextInput from "@/components/ui/UiTextInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiCard from "@/components/ui/UiCard.vue";

const router = useRouter();
const toast = useToast();
const userStore = useUserStore();

/**
 * onSubmit:
 * Log in the user using Firebase Authentication with provided email and password.
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    // Sign in to firebase
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    // Check if the user's email has been verified
    if (!userCredentials.user.emailVerified) {
      // If the email hasn't been verified, send the verification email
      try {
        if (auth.currentUser) {
          // send the verification email
          sendEmailVerification(auth.currentUser);

          // Show a notification saying that the verification email has been sent
          toast.warning(
            "Your email address has not yet been verified, please check your inbox"
          );
        } else {
          // User isn't signed in, show an error
          toast.error(
            "Somthing went wrong when sending the verification email, please try again"
          );
        }
      } catch (error) {
        toast.error(
          "Somthing went wrong when sending the verification email" + error
        );
      }
    } else {
      // The email has been verified, add the user details to the user store
      userStore.$state = {
        displayName: userCredentials.user.displayName,
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      };

      // Redirect to the homepage
      router.push("/");
    }
  } catch {
    // Show a generic error message when something goes wrong while signing in
    toast.error("Somthing went wrong when singing in, please try again");
  }
});
</script>
