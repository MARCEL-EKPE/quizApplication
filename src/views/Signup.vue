<template>
  <form @submit.prevent="signup">
    <h3 class="text-danger">Signup</h3>

    <div class="form-group">
      <label>Username</label>
      <input
        type="text"
        class="form-control"
        placeholder="username"
        v-model="username"
      />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input
        type="email"
        class="form-control"
        placeholder="email"
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

    <button @click="signup" class="btn btn-primary btn-block">Signup</button>
    <small
      >already have an account?
      <router-link to="/login" class="text-danger">Login</router-link></small
    >
  </form>
</template>

<script>
import { getXataClient } from "../xata";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
export default {
  name: "signup",
  setup() {
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const email = ref("");

    const signup = async function () {
      const xata = getXataClient();
      const user = await xata.db.users
        .filter("username", username.value)
        .getFirst();
      if (!user) {
        await xata.db.users
          .create({
            username: username.value,
            password: password.value,
            email: email.value,
          })
          .then((res) => {
            //push to next route
            router.push("/login");
            toast.success(
              `${res.username} Your account creation was successful`,
              {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              }
            );
          })
          .catch((error) =>
            toast.error(`signup failed ${error.message}`, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 5000,
            })
          );
      } else {
        router.push("/login");
      }
    };
    return {
      username,
      password,
      email,
      signup,
    };
  },
};
</script>

<style scoped>
form {
  background-color: #ffffff;
  border-radius: 2px;
  padding: 10px;
  width: 500px;
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
