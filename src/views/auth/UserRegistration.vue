<template>
  <div
    class="flex flex-col w-full min-h-screen justify-center items-center p-8 bg-lightest-gray"
  >
    <h1 class="mb-2">Create a new account</h1>
    <p class="mb-8">or <router-link to="login">log in</router-link></p>
    <ui-card v-if="!registrationSuccessfull">
      <form @submit="onSubmit" class="w-80 max-w-full">
        <div class="mb-4">
          <ui-text-input name="email" label="Email" type="email" />
        </div>
        <div class="mb-4">
          <ui-text-input
            name="username"
            label="Username"
            type="text"
            :required="true"
          />
        </div>
        <div class="mb-4">
          <ui-text-input
            name="password"
            label="Password"
            type="text"
            :required="true"
          />
        </div>

        <ui-button
          label="Create account"
          :loading="isSubmitting"
          @click="onSubmit"
        />
      </form>
    </ui-card>
    <ui-card v-if="registrationSuccessfull" class="max-w-xl">
      <p>
        Your account has been created. A verification email has been sent,
        follow the instructions to activate your account. Please check your spam
        folder if you haven't received any email.
      </p>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useToast } from "vue-toastification";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

// Components
import UiTextInput from "@/components/ui/UiTextInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiCard from "@/components/ui/UiCard.vue";

const toast = useToast();
const { handleSubmit, isSubmitting } = useForm();

const registrationSuccessfull = ref(false);

/**
 * onSubmit:
 * Create a new user in firebase, show an error if it goes wrong.
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

const onSubmit = handleSubmit(async (values) => {
  try {
    // Create the new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    // Create their ToDo doc
    await setDoc(doc(db, "todos/", userCredential.user.uid), {
      createdAt: serverTimestamp(),
    });

    // Check if the user has been created, the user should now be logged in
    if (userCredential && auth.currentUser) {
      // Update the displayName for the user
      updateProfile(auth.currentUser, {
        displayName: values.username,
      });

      // Send the email verification email
      sendEmailVerification(auth.currentUser);

      // Set the registrationSuccessfull ref to true to hide the form and show a success message
      registrationSuccessfull.value = true;
    }
  } catch (error) {
    // Show an error if it fails
    toast.error(
      "Somthing went wrong when singing up, please try again. " + error
    );
  }
});
</script>
