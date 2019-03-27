<template>
  <router-link :to="'/question/' +question._id">
    <div class="row">
      <div class="col s1">
        <div class="boxed">
          <div class="vote">
            <p>
              {{ totalVotes }}
              <br>votes
            </p>
          </div>
        </div>
      </div>
      <div class="col s1">
        <div id="answer" class="boxed">
          <div class="vote">
            <p>
              {{ question.answersTotal }}
              <br>answer
            </p>
          </div>
        </div>
      </div>
      <div class="col s8 offset-s2">
        <div class="question">
          <h6>{{ question.title }}</h6>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Question",
  data() {
    return {
      totalVotes: 0
    };
  },
  props: ["question"],
  mounted() {
    console.log(this.question.votes, "dalem mounted");
    this.question.votes.map(e => {
      // console.log(e.status, "=========================================");
      if (e.status === true) {
        this.totalVotes += 1;
      } else if (e.status === false) {
        this.totalVotes -= 1;
      }
    });
    console.log(this.totalVotes, "ini total votes nyaaaa");
  }
};
</script>

<style>
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
