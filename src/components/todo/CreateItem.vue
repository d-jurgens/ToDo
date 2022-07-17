<template>
  <ui-card>
    <h3 class="mb-4">Create a new item</h3>
    <form @submit="onSubmit">
      <div class="flex flex-col items-start sm:flex-row">
        <div class="mb-4 w-full sm:mb-0 sm:mr-4">
          <ui-text-input name="title" type="text" />
        </div>
        <div class="grow">
          <ui-button label="Submit" type="submit" :loading="isSubmitting" />
        </div>
      </div>
    </form>
  </ui-card>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";
import * as yup from "yup";

// Components
import UiCard from "@/components/ui/UiCard.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiTextInput from "@/components/ui/UiTextInput.vue";

const toast = useToast();
const userStore = useUserStore();

/**
 * onSubmit:
 * Create the new item.
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

// Set up the validation schema
const schema = yup.object({
  title: yup.string().required(),
});

// Register the form
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
});

// Handle the form submission
const onSubmit = handleSubmit(async (values) => {
  try {
    // Create the new item
    await addDoc(collection(db, "todos/" + userStore.uid + "/items"), {
      title: values.title,
      completed: false,
      createdAt: serverTimestamp(),
      createdBy: {
        displayName: userStore.displayName,
        uid: userStore.uid,
      },
    });
    // Reset the form
    resetForm();
  } catch (error) {
    // Show an error if something goes wrong
    toast.error(
      "Somthing went wrong when creating your item, please try again. " + error
    );
  }
});
</script>
