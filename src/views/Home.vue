<template>
  <div class="container">
    <div class="heading__statements">
      <h1>QUIZAPP</h1>
      <p>
        <span class="highlight">
          The Bridge between the Recruiter and the best Talents</span
        >
      </p>
      <p class="info">
        We source and match right candidates for the right jobs by simply
        assessing their skill set through our amazing QuizApp
      </p>
      <router-link to="/signup" class="text-danger">register now</router-link>
    </div>
    <div class="img__content">
      <img src="../assets/hands.png" alt="image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
h1 {
  font-weight: 700;
  font-size: 30px;
  color: #fff;
  font-style: italic;
}
p {
  color: #fff;
  font-weight: 500px;
  font-size: 1.5rem;
}
.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 30px;
  background-image: linear-gradient(230deg, blue, white);
}
.heading__statements {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 80%;
}
.img__content {
  flex-basis: 20%;
}
img {
  width: 500px;
  margin: 20px;
  transform: scale(1.07, 1.05) skewX(-15deg);
}
.highlight {
  display: block;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.9;
  padding: 10px;
  transform: scale(1.07, 1.05) skewX(-15deg);
  background-image: linear-gradient(to top left, red, blue);
}
.info {
  opacity: 0.9;
  height: 100%;
  width: 100%;
  transform: scale(1.07, 1.05) skewX(-15deg);
  background-image: linear-gradient(to top left, blue, red);
}
@media screen and (max-width: 1200px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }
}
</style>
