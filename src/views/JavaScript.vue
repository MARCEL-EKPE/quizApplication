<template>
  <div>
    <template v-if="!quizCompleted">
      <section class="quiz__content">
        <div class="score__number">
          <span class="number"> No {{ currentQuestion + 1 }}</span>
          <span class="time">You have {{ time }} min left</span>
        </div>
        <div class="quiz__info">
          <p class="question__tag">Question:</p>
          <p class="question">{{ getCurrentQuestion.question }}</p>
        </div>
        <div
          v-for="(option, index) in getCurrentQuestion.options"
          :key="index"
          class="div__options"
        >
          <button
            class="options"
            @click="onOptionClicked(option, index)"
            ref="optionElements"
          >
            <span class="alpha">{{
              index == 0 ? "A." : index == 1 ? "B." : index == 2 ? "C." : "D."
            }}</span>
            <span class="beta">{{ option }}</span>
          </button>
        </div>
        <button
          @click="nextQuestion"
          :disabled="!onOptionClicked"
          class="btn disabled"
          ref="btn__next"
        >
          {{
            currentQuestion == questions.length - 1 ? "Finish" : "Next Question"
          }}
        </button>
      </section>
    </template>
    <div class="result__message" v-else>
      <h3>You have Finised the Quiz</h3>
      <h3>Your Score is {{ score }}/{{ questions.length }}</h3>
      <h3>
        {{
          score > questions.length / 2
            ? `Congratulations You passed 🎉`
            : "You Failed 👎"
        }}
      </h3>
    </div>
  </div>
</template>

<script setup>
import { getXataClient } from "../xata";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const questions = ref([]);
//making request to get resource on page load
onMounted(async function () {
  const xata = getXataClient();
  const records = await xata.db.javascript.getAll();
  questions.value = records;
});

const quizCompleted = ref(false);
const currentQuestion = ref(0);
const score = ref(0);

//getting the current question
const getCurrentQuestion = computed(() => {
  const question = questions.value.at(currentQuestion.value);
  return question == undefined ? {} : question;
});

// When an option is clicked
const optionElements = ref(null);
const btn__next = ref(null);

const onOptionClicked = (option, index) => {
  btn__next.value.classList.remove("disabled");
  const currentOption = optionElements.value.at(index);
  const answerIndex = index + 1;

  // When the correct option is clicked
  if (getCurrentQuestion.value.answer == answerIndex) {
    score.value += 1;
    currentOption.classList.add("correct");
    optionElements.value.forEach((d) => d.classList.add("disabled"));
  } else {
    currentOption.classList.add("wrong");
    optionElements.value.forEach((d) => d.classList.add("disabled"));
  }
};

//going unto the next question
const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
  } else {
    quizCompleted.value = true;
    btn__next.value.classList.remove("disabled");
    sendData();
  }
  btn__next.value.classList.add("disabled");
  optionElements.value.forEach((d) =>
    d.classList.remove("disabled", "correct", "wrong")
  );
};

//setting time out
const time = ref(5);
onMounted(function () {
  setInterval(() => {
    time.value -= 1;
    if (time.value == 0) {
      quizCompleted.value = true;
      sendData();
    }
  }, 60000);
});

//sending data
const sendData = async function () {
  const xata = getXataClient();
  if (quizCompleted.value == true) {
    const { username } = route.params;
    await xata.db.leaders_board.create({
      name: username,
      score: score.value,
    });
  }
};
</script>

<style scoped>
.quiz__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #ffff;
  padding: 20px;
}
.quiz__info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  margin-top: 8px;
  padding: 5px;
  box-shadow: 0px 2px 1px 1px #d3cfcf;
  border-radius: 3px;
  width: 100%;
}
.div__options {
  width: 100%;
}
.options {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
  border: #ffffff;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0px 2px 2px 1px #d1cccc;
  padding: 5px;
  text-align: start;
}
.alpha {
  flex-basis: 5%;
  margin-left: 2px;
  border-radius: 5px;
}
.beta {
  flex-basis: 95%;
  margin-left: 3px;
}
.score__number {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.number {
  font-family: fantasy;
  border-radius: 2px;
  padding: 5px;
  cursor: none;
}
.time {
  padding: 5px;
  cursor: none;
  font-size: 12px;
  font-weight: 700;
  color: red;
  font-style: italic;
}
.btn {
  display: inline-block;
  margin: 15px 0px 0px 500px;
  background-color: #3919ef;
  color: #ffffff;
}

.result__message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(234deg, red, blue);
  color: #ffff;
  padding: 20px;
  border: 2px solid #ffff;
}
.correct {
  color: white;
  background-color: #27e127;
}
.wrong {
  color: white;
  background-color: red;
}
.disabled {
  pointer-events: none;
  opacity: 0.65;
}
</style>
