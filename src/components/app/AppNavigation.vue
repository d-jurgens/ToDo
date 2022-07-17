<template>
  <header class="shadow py-4 bg-primary text-white">
    <div class="flex justify-between max-w-3xl mx-auto px-4">
      <router-link to="/" class="text-lg font-bold text-white"
        >ToDo</router-link
      >
      <nav class="relative">
        <font-awesome-icon
          icon="fa-solid fa-bars"
          ref="dropDownToggle"
          class="hover:cursor-pointer"
          @click="showDrowDown ? (showDrowDown = false) : (showDrowDown = true)"
        />
        <div
          class="absolute -top-15 right-0 bg-white shadow min-w-max"
          :class="showDrowDown ? '' : 'hidden'"
        >
          <router-link to="account">
            <div
              class="py-2 px-4 border-b border-lightest-gray hover:bg-lightest-gray transition-colors"
            >
              <font-awesome-icon icon="fa-solid fa-circle-user" class="mr-2" />
              My account
            </div>
          </router-link>
          <a @click="logOut()" class="hover:cursor-pointer">
            <div class="py-2 px-4 hover:bg-lightest-gray transition-colors">
              <font-awesome-icon
                icon="fa-solid fa-arrow-right-from-bracket"
                class="mr-2"
              />
              Log out
            </div>
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRouter } from "vue-router";
import { auth } from "@/firebase";
import { signOut } from "@firebase/auth";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const toast = useToast();
const userStore = useUserStore();

const showDrowDown = ref(false);

// Ref to identify the toggle button
const dropDownToggle = ref(null);

// Set showDropDown to false if click outside toggle button
onClickOutside(dropDownToggle, () => {
  showDrowDown.value = false;
});

/**
 * logOut:
 * Log out the user.
 * @version 1.0
 * @since 1.0
 * @author David Jurgens
 */

async function logOut() {
  try {
    // Log out the user
    await signOut(auth);

    // Redirect to login page
    router.push("/login");

    // Reset the user store
    userStore.$state = {
      displayName: null,
      email: null,
      uid: null,
    };
  } catch (error) {
    // Show an error if aything goes wrong
    toast.error("Somthing went wrong when singing out, please try again");
  }
}
</script>
