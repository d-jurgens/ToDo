<template>
  <ui-card>
    <h3 class="mb-4">Create a new ToDo</h3>
    <form @submit="onSubmit">
      <div class="flex flex-col items-start sm:flex-row">
        <div class="mb-4 w-full sm:mb-0 sm:mr-4">
          <ui-text-input
            name="title"
            label="Title"
            type="text"
            :required="true"
          />
        </div>
        <div class="sm:pt-6 grow">
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

// Components
import UiCard from "@/components/ui/UiCard.vue";
import UiTextInput from "@/components/ui/UiTextInput.vue";
import UiButton from "@/components/ui/UiButton.vue";

const toast = useToast();
const userStore = useUserStore();

const { handleSubmit, isSubmitting, resetForm } = useForm();

const onSubmit = handleSubmit(async (values) => {
  try {
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
    toast.error(
      "Somthing went wrong when creating your item, please try again. " + error
    );
  }
});
</script>
