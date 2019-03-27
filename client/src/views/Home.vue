<template>
  <div id="main" class="container center">
    <div class="row">
      <div id="main-content" class="col s6 offset-s3">
        <div class="row left">
          <div class="col s12">
            <div class="container left">
              <div class="title">
                <h5 class="title">Top Questions</h5>
              </div>
            </div>
          </div>
          <div id="questions" class="col s12" v-for="question in allQuestions" :key="question._id">
            <Question :question="question"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Question from "@/components/Question.vue";

export default {
  name: "home",
  components: {
    Question
  },
  data() {
    return {
      allQuestions: [],
      allAnswers: []
    };
  },
  created() {
    let totalVote = 0;
    axios
      .get("http://localhost:3000/questions")
      .then(questions => {
        for (let i = 0; i < questions.data.length; i++) {
          // questions.data[i].totalVote = totalVote;

          axios
            .get(
              `http://localhost:3000/answers/questionFind?id=${
                questions.data[i]._id
              }`
            )
            .then(answersFound => {
              questions.data[i].answers = [];
              console.log(
                answersFound.data.length,
                "ini jwabannyaaaa njengngnis"
              );
              questions.data[i].answersTotal = answersFound.data.length;
              console.log(questions.data[i].answersTotal);
              this.allQuestions.push(questions.data[i]);
            })
            .catch(err => {
              console.log(err);
            });

          console.log(questions.data[i]._id, "ini idnyaaa");
          console.log(questions.data[i], "ini smunyaa");
        }
        // this.allQuestions.reverse();
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
#main-content {
  border-left: 1px rgb(190, 190, 190) solid;
}

#questions {
  /* border-bottom: 1px rgb(190, 190, 190) solid; */

  border-top: 1px rgb(190, 190, 190) solid;
}

.boxed {
  border: 1px solid rgb(50, 145, 50);
  border-radius: 4px;
  height: 3.5rem;
  width: 4.5rem;
  /* top: 3px; */
  margin-top: 1.3rem;
  margin-left: 1.3rem;
  color: rgb(50, 145, 50);
}

.vote {
  position: relative;
  bottom: 9px;
}

.question {
  margin-top: 2.5rem;
  /* margin-left: 6rem; */
  text-align: left;
}

.title {
  margin-top: 3rem;
  margin-bottom: 4rem;
  font-size: 3rem;
}

#answer {
  margin-left: 3rem;
}

.bottom {
  border-bottom: 1px rgb(190, 190, 190) solid;
}

#main {
  padding-top: 3.3rem;
}
</style>