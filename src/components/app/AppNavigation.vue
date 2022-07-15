<template>
  <header class="shadow py-4">
    <div class="flex justify-between max-w-3xl mx-auto px-4">
      <span class="text-lg font-bold">ToDo</span>
      <nav>
        <router-link to="account">My account</router-link>
        <a @click="logOut()">Log out</a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { auth } from "@/firebase";
import { signOut } from "@firebase/auth";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const toast = useToast();
const userStore = useUserStore();

async function logOut() {
  try {
    await signOut(auth);
    userStore.$state = {
      displayName: null,
      email: null,
      uid: null,
    };
    router.push("/login");
  } catch (error) {
    toast.error("Somthing went wrong when singing out, please try again");
  }
}
</script>
