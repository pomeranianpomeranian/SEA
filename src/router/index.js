import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Result from "../views/Result.vue";
import Details from "../views/Details.vue";
import NewPost from "../views/NewPost.vue";
import MyPost from "../views/MyPost.vue";
import Edit from "../views/Edit.vue";
import User from "../views/User.vue";
import SignUp from "../views/SignUp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/result",
    name: "result",
    component: Result,
  },
  {
    path: "/result/:postId",
    name: "details",
    component: Details,
    props: true,
  },
  {
    path: "/user/:username",
    name: "user",
    component: User,
    props: true,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/user/:username/new",
    name: "newpost",
    component: NewPost,
    props: true,
  },
  {
    path: "/user/:username/:postId",
    name: "mypost",
    component: MyPost,
    props: true,
  },
  {
    path: "/user/:username/:postId/edit",
    name: "edit",
    component: Edit,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
