<template>
  <div>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link to="" class="navbar-brand">
          <span class="text-primary">Q</span>
          <span class="text-danger">U</span>
          <span class="text-warning">I</span>
          <span class="text-success">Z</span>
          <span class="text-danger">A</span>
          <span class="text-primary">P</span>
          <span class="text-primary">P</span>
        </router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link text-primary"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/signup" class="nav-link signup text-danger"
                >Signup</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style scoped>
.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 4px #a6a5a443;
}
a {
  font-weight: 700;
}

.signup {
  color: red;
}
</style>
