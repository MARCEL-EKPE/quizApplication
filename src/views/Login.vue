<template>
  <form @submit.prevent="login">
    <h3 class="text-danger">Login</h3>

    <div class="form-group">
      <label>Email</label>
      <input
        type="email"
        class="form-control"
        placeholder="Email"
        v-model="email"
      />
    </div>

    <div class="form-group">
      <label>password</label>
      <input
        type="password"
        class="form-control"
        placeholder="password"
        v-model="password"
      />
    </div>
    <button class="btn btn-primary btn-block">Login</button>
  </form>
</template>

<script>
import { getXataClient } from "../xata";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
export default {
  name: "login",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const login = async function () {
      const xata = getXataClient();
      const user = await xata.db.users.filter("email", email.value).getFirst();
      console.log(user);
      if (!email.value || !password.value) {
        toast.error("Please fill all empty fields", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      } else if (
        email.value !== user.email ||
        password.value !== user.password
      ) {
        toast.error("Incorrect Credentials", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      } else {
        toast.success("Login successful", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
        //push to the next route
        router.push(`/quiz/${user.username}`);
      }
    };
    return {
      email,
      password,
      login,
    };
  },
};
</script>

<style scoped>
form {
  background-color: #ffffff;
  padding: 10px;
  width: 500px;
  height: 100%;
}
.form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}
h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
</style>
