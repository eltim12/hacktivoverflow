<template>
  <div id="main" class="container center">
    <div class="row">
      <div id="main-content" class="col s6 offset-s3">
        <div class="row">
          <div class="col s12">
            <div class="container left">
              <div>
                <h5 class="title left-align">
                  {{ questionPage.question.title }}
                  <hr>
                  <h6>Asked by: {{ questionPage.question.userId.name }}</h6>
                </h5>
              </div>
            </div>
          </div>
          <div id="infos" class="col s12" style="word-wrap:break-word">
            <div class="row">
              <div class="col s2">
                <div id="height-up" class="row">
                  <a class="vote-btn" href @click.prevent="vote('up', questionPage.question._id)">
                    <i class="material-icons medium">keyboard_arrow_up</i>
                  </a>
                </div>
                <div id="height-down" class="row">
                  <a href class="vote-btn" @click.prevent="vote('down', questionPage.question._id)">
                    <i class="material-icons medium">keyboard_arrow_down</i>
                  </a>
                </div>
              </div>
              <div class="col s10">
                <p id class="left-align" v-html="questionPage.question.content"></p>
              </div>
            </div>
          </div>
          <div class="col s12" id>
            <div class="row">
              <div class="col s1">
                <div class="boxed">
                  <div class="vote">
                    <p>
                      {{ questionPage.question.totalVotes }}
                      <br>votes
                    </p>
                  </div>
                </div>
              </div>
              <div class="col s1">
                <div id="answer" class="boxed">
                  <div class="vote">
                    <p>
                      {{ questionPage.answers.length }}
                      <br>answer
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="userId === questionId" class="col s2 offset-s6">
                <div id="edit-button">
                  <routerLink id="edit" href :to="'/editQuestion/'+ questionPage.question._id">
                    <h6>edit</h6>
                  </routerLink>
                </div>
              </div>
              <div v-if="userId === questionId" class="col s2">
                <div id="cancel-button">
                  <a id="cancel" href @click.prevent="deleteQuestion">
                    <h6>delete</h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            id="questions"
            class="col s12"
            v-for="answer in questionPage.answers"
            :key="answer._id"
          >
            <Answer :answer="answer" :allData="questionPage"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <form @submit.prevent="submitAnswer">
        <div class="col s12">
          <h4>Your Answer</h4>
        </div>
        <div class="col s12">
          <div class="row">
            <div class="input-field col s8 offset-s2">
              <ckeditor :editor="editor" v-model="answerContent" :config="editorConfig"></ckeditor>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s8 offset-s2">
              <button
                class="btn waves-effect waves-hard blue-grey darken-4"
                type="submit"
                name="action"
              >
                Submit
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Answer from "@/components/Answer.vue";
import axios from "axios";

export default {
  name: "question-detail",
  components: {
    Answer
  },
  data() {
    return {
      clickedUp: false,
      clickedDown: false,
      votes: 0,
      answerContent: "",
      editor: ClassicEditor,
      editorConfig: {},
      isOwner: false
    };
  },
  computed: mapState(["questionPage", "userId", "questionId"]),
  mounted() {
    this.votes = this.questionPage.question.totalVotes;
    // console.log(this.votes);
    console.log(
      this.questionPage.question.totalVotes,
      "iniiiiiiiiiiii vote totalll"
    );
    console.log(localStorage.getItem("userId"), "ini user id localstorage");
    console.log(this.questionPage.question.userId._id, "ini user id question");
  },
  created() {
    this.$store.dispatch("getQuestion", {
      questionId: this.$route.params.id
    });
  },
  methods: {
    deleteQuestion() {
      axios
        .delete(`http://localhost:3000/questions?id=${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(successDelete => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },

    submitAnswer() {
      axios
        .post(
          `http://localhost:3000/answers?questionId=${this.$route.params.id}`,

          {
            content: this.answerContent,
            userId: localStorage.getItem("userId")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(postedAnswer => {
          console.log("posted answer");
          this.$store.dispatch("getQuestion", {
            questionId: this.$route.params.id
          });
          this.answerContent = "";
        })
        .catch(err => {
          console.log(err);
        });
      console.log("masok submit answer");
    },
    //=========================================================

    vote(direction, id) {
      console.log(id, direction, "dalem voteeeeeee");
      if (direction === "up" && this.clickedUp !== true) {
        this.clickedUp = true;
        this.clickedDown = false;
        // this.index = 1
        this.votes += 1;
        this.questionPage.question.totalVotes += 1;
        axios
          .put(
            `http://localhost:3000/questions?userId=${localStorage.getItem(
              "userId"
            )}`,
            {
              questionId: this.$route.params.id,
              vote: "true"
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(votedUp => {
            console.log("success vote up");
            this.$router.push(`/question/${this.$route.params.id}`);
          })
          .catch(err => {
            console.log(err);
          });

        console.log(this.votes);
      } else if (direction === "down" && this.clickedDown !== true) {
        this.clickedDown = true;
        this.clickedUp = false;

        this.votes -= 1;
        this.questionPage.question.totalVotes -= 1;

        axios
          .put(
            `http://localhost:3000/questions?userId=${localStorage.getItem(
              "userId"
            )}`,
            {
              questionId: this.$route.params.id,
              vote: "false"
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(votedUp => {
            console.log("success vote up");
            this.$router.push(`/question/${this.$route.params.id}`);
          })
          .catch(err => {
            console.log(err);
          });
        console.log(this.votes);
      }
    }
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
  margin-top: 4rem;
  margin-bottom: 4rem;
  font-size: 2rem;
}

#answer {
  margin-left: 3rem;
}

.bottom {
  border-bottom: 1px rgb(190, 190, 190) solid;
}

#question-content {
  position: relative;
  /* top: rem; */
  bottom: 2rem;
}

.vote-btn {
  color: black;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.vote-btn:hover {
  color: grey;
}

#height-up {
  height: 2rem;
}

#height-mid {
  height: 0.8rem;
}

#height-down {
  height: 1rem;
}

#main {
  padding-top: 2rem;
}

#infos {
  height: 6rem;
}

#cancel-button {
  border: 1px black solid;
  ransition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.4s ease-in;
}

#cancel-button:hover {
  background-color: rgb(206, 0, 0);
  color: white;
}

#cancel {
  color: black;
  font-weight: 3px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#cancel:hover {
  color: white;
}
#edit-button {
  border: 1px black solid;
  ransition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.4s ease-in;
}

#edit-button:hover {
  background-color: grey;
  color: white;
}

#edit {
  color: black;
  font-weight: 3px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#edit:hover {
  color: white;
}
</style>


