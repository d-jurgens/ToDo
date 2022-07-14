import { createApp } from "vue";
import { createPinia } from "pinia";
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

app.use(createPinia());
app.use(router);

app.mount("#app");
