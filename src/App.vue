<template>
  <div id="app">
    <Nav />
    <div class="content-wrapper">
      <div class="content-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: { Nav },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  color: #444;
  line-height: 1.9;
  background-color: #ffffff;
}

#app {
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.content-wrapper {
  width: 100vw;
  height: 100vh;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.content-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px;
  transition: all 0.3;
}
</style>
