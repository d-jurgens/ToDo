<template>
  <app-navigation v-if="userStore.uid" />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

// Components
import AppNavigation from "@/components/app/AppNavigation.vue";

const userStore = useUserStore();
</script>
