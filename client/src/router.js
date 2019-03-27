import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: () => import(/* webpackChunkName: "register" */ "@/views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
    },
    {
      path: "/ask",
      name: "ask",
      component: () => import(/* webpackChunkName: "ask" */ "@/views/Ask.vue")
    },
    {
      path: "/question/:id",
      name: "question",
      component: () => import(/* webpackChunkName: "question" */ "@/views/QuestionDetail.vue")
    },
    {
      path: "/editquestion/:id",
      name: "editQuestion",
      component: () => import(/* webpackChunkName: "editQuestion" */ "@/views/EditQuestion.vue")
    },
    {
      path: "/editanswer/:id",
      name: "editAnswer",
      component: () => import(/* webpackChunkName: "editAnswer" */ "@/views/EditAnswer.vue")
    }
  ]
});
