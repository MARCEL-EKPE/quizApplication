import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// createApp(App).use(router).use(Vue3Toasity).mount("#app");
const app = createApp(App);
app.use(router);
app.use(Vue3Toasity);
app.mount("#app");
