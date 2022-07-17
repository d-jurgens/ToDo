<template>
  <main class="max-w-3xl mx-auto p-4">
    <h1 class="mb-4">Account</h1>
    <ui-button
      label="Delete account"
      color="danger"
      icon="fa-circle-exclamation"
      @click="showDeleteDialog = true"
    />
    <ui-dialog
      v-if="showDeleteDialog"
      title="Delete account"
      text="Are you sure you want to delete your account? You will lose access to all your items. This cannot be undone."
      accept-text="Delete account"
      type="danger"
      :loading="deletingUser"
      @on-accept="onDeleteAccount"
      @on-cancel="showDeleteDialog = false"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { deleteUser } from "firebase/auth";
import { auth } from "@/firebase";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

// Components
import UiButton from "@/components/ui/UiButton.vue";
import UiDialog from "@/components/ui/UiDialog.vue";

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();

const showDeleteDialog = ref(false);

const deletingUser = ref(false);

/**
 * onDeleteAccount:
 * Delete the user, cleare the userStore and redirect to the login page.
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

async function onDeleteAccount() {
  deletingUser.value = true;
  try {
    if (auth.currentUser) {
      // Delete the user
      await deleteUser(auth.currentUser);

      // Redirect to login page
      router.push("/login");

      // Reset the user store
      userStore.$state = {
        displayName: null,
        email: null,
        uid: null,
      };

      // Show a notification to confirm that the account has been deleted
      toast.success("Your account has been deleted");
    }
  } catch (error) {
    toast.error("Somthing went wrong when trying to delete the user" + error);
    deletingUser.value = false;
  }
}
</script>
