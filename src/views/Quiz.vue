<template>
  <div>
    <h3 class="heading__text">Welcome {{ user }} choose quiz</h3>
    <div class="container__wraper">
      <div class="quiz__container">
        <div @click="toJavascript" class="javascript">JAVASCRIPT</div>
        <div @click="toC_sharp" class="c_sharp">C#</div>
        <div @click="toPython" class="python">PYTHON</div>
      </div>
      <div class="leaders__board">
        <h4 class="heading__text">Leaders Board</h4>
        <div v-for="result in results" :key="result.id" class="name__score">
          <span class="name">{{ result.name }}</span>
          <span class="score">{{ result.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getXataClient } from "../xata";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const user = ref("");
user.value = route.params.username;
console.log(user.value);

const toJavascript = () => router.push(`/javascript/${user.value}`);
const toC_sharp = () => router.push(`/csharp/${user.value}`);
const toPython = () => router.push(`/python/${user.value}`);

const results = ref([]);
onMounted(async function () {
  const xata = getXataClient();
  const records = await xata.db.leaders_board.getAll();
  results.value = records;
});
</script>

<style scoped>
.heading__text {
  font-weight: 700;
  color: #fff;
  padding: 5px;
}
.container__wraper {
  background-color: #2f3745;
  height: 400px;
  width: 800px;
  display: flex;
  justify-content: center;
  /* border: 1px solid #8383f0; */
}
.quiz__container {
  flex-basis: 70%;
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.javascript,
.c_sharp,
.python {
  height: 100px;
  width: 100%;
  border: 2px solid #8188ef;
  text-align: center;
  padding: 30px;
  margin-top: 20px;
  color: #fff;
  background-color: #0d169a;
}
.javascript:hover {
  background-color: #2f3745;
  cursor: pointer;
}
.c_sharp:hover {
  background-color: #2f3745;
  cursor: pointer;
}
.python:hover {
  background-color: #2f3745;
  cursor: pointer;
}

.leaders__board {
  flex-basis: 30%;
  padding: 5px;
  /* border: 1px solid #8383f0; */
  color: #fff;
  overflow: scroll;
}
.name__score {
  display: flex;
  padding: 0 0 5px 4px;
  background-color: #3a414b;
}
.name__score:nth-child(odd) {
  background: #2e2e4f;
}
.name {
  flex-basis: 70%;
  font-weight: bolder;
}
.score {
  flex-basis: 30%;
  font-weight: bolder;
}
</style>
