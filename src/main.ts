import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  position: "bottom-center",
  hideProgressBar: true,
};

app.use(Toast, options);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount("#app");
