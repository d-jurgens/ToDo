import { createApp } from "vue";

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Vue-toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faCircleUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

library.add({ faBars, faCircleUser, faArrowRightFromBracket });

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

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
