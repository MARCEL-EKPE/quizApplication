import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import JavaScript from "../views/JavaScript.vue";
import C_sharp from "../views/C_sharp.vue";
import Python from "../views/Python.vue";
import Quiz from "../views/Quiz.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/quiz/:username",
    name: "quiz",
    component: Quiz,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/javascript/:username",
    name: "javascript",
    component: JavaScript,
  },
  {
    path: "/csharp/:username",
    name: "csharp",
    component: C_sharp,
  },
  {
    path: "/python/:username",
    name: "python",
    component: Python,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
