import Vue from "vue";
import VueRouter from "vue-router";

import LoginView from "@/views/LoginView";
import SignupView from "@/views/SignupView";
import PasswordChoiceView from "@/views/user/PasswordChoiceView";
import PasswordChoiceEmailView from "@/views/user/PasswordChoiceEmailView";
import UserDetailView from "@/views/user/UserDetailView";

import Home from "@/views/Home";
// import FeedItem2 from "../views/FeedItem2";

import NotFoundComponent from "@/components/NotFoundComponent";
import ErrorComponent from "@/components/ErrorComponent";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home, meta: { title: "HoneyCombo" } },
  { path: "/error", name: "Error", component: ErrorComponent },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { title: "Login" },
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
    meta: { title: "Signup" },
  },
  { path: "*", name: "NotFound", component: NotFoundComponent },
  {
    path: "/user/password_choice",
    name: "PasswordChoice",
    component: PasswordChoiceView,
    meta: { title: "비밀번호 찾기" },
  },
  {
    path: "/user/password_choice_email",
    name: "PasswordChoiceEmail",
    component: PasswordChoiceEmailView,
    meta: { title: "이메일 인증번호 입력" },
  },
  {
    path: "/userdetail", // 백에서 데이터 받아오면 이거로 변경 path: '/:username',
    name: "UserDetail",
    component: UserDetailView,
    meta: { title: "usernickname · HoneyCombo" }, // 이거도 나중에 유저마다 이름 다르게 변경해야함 (컴포넌트 내에서 변경가능)
  },
  // {
  //   path: "/feed/:fid",
  //   name: "FeedItem2",
  //   component: FeedItem2,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("to : ", to);
  console.log("from : ", from);

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  const publicPages = ["Signup", "Login", "NotFound"];
  const needNotAuthPages = ["Signup", "Login"];

  const authRequired = !publicPages.includes(to.name);
  const unauthRequired = needNotAuthPages.includes(to.name);
  const isLoggedIn = !!window.$cookies.isKey("auth-token");

  if (unauthRequired && isLoggedIn) {
    next("/");
  }
  authRequired && !isLoggedIn ? next({ name: "Login" }) : next(); // 우선 로그인 안 된 유저는 모든 페이지에 대해 login페이지로 가게끔 함.
});

export default router;
