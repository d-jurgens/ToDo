import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    displayName: null as string | null,
    email: null as string | null,
    uid: null as string | null,
    emailVerified: null as boolean | null,
  }),
  persist: true,
});
