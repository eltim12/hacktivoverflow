import Vue from "vue";
import Vuex from "vuex";
import Swal from "sweetalert2";
import router from "./router";
import axios from "axios";

Vue.use(Vuex);

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000
});

export default new Vuex.Store({
  state: {
    isLogin: false,
    userId: 0,
    questionId: 0,
    questionPage: {
      question: {},
      answers: []
    }
  },
  mutations: {
    setUserStatus(state, payload) {
      state.isLogin = payload.status;
      state.userId = localStorage.getItem("userId");
    },

    postQuestion(state, payload) {
      state.questionPage.question = {};
      console.log("dale storee", payload.question);
      state.questionPage.question = payload.question;
    },

    postAnswers(state, payload) {
      state.questionPage.answers = [];
      state.questionPage.answers = payload.answers;
    },

    postCurrentQuestion(state, payload) {
      state.questionId = payload.id;
    }
  },
  actions: {
    notif({ commit }, { type, message }) {
      Toast.fire({
        type: type,
        text: message
      });
    },

    loginStatus({ commit }) {
      commit("setUserStatus", {
        status: true
      });
    },

    logout({ commit }) {
      localStorage.clear();
      commit("setUserStatus", {
        status: false
      });
    },

    getQuestion({ commit }, { questionId }) {
      console.log("dalem storeeeee", questionId);
      axios
        .get(`http://localhost:3000/questions/find?id=${questionId}`)
        .then(questionFound => {
          questionFound.data.totalVotes = 0;
          questionFound.data.votes.map(e => {
            if (e.status === true) {
              questionFound.data.totalVotes += 1;
            } else if (e.status === false) {
              questionFound.data.totalVotes -= 1;
            }
          });

          commit("postQuestion", {
            question: questionFound.data
          });
          commit("postCurrentQuestion", {
            id: questionFound.data.userId._id
          });
          axios
            .get(`http://localhost:3000/answers/questionFind?id=${questionId}`)
            .then(answersFound => {
              console.log(answersFound.data, "ini answersnyaaaaaaaaaaa");

              for (let i = 0; i < answersFound.data.length; i++) {
                answersFound.data[i].totalVotes = 0;

                for (let j = 0; j < answersFound.data[i].votes.length; j++) {
                  if (answersFound.data[i].votes[j].status == 1) {
                    answersFound.data[i].totalVotes += 1;
                  } else if (answersFound.data[i].votes[j].status == 0) {
                    answersFound.data[i].totalVotes -= 1;
                  }
                }
              }

              commit("postAnswers", {
                answers: answersFound.data
              });

              router.push(`/question/${questionId}`);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
