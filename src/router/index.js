import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Map from "../views/Map.vue";
import Search from "../views/Search.vue";
import Result from "../views/Result.vue";
import Details from "../views/Details.vue";
import NewPost from "../views/NewPost.vue";
import MyPost from "../views/MyPost.vue";
import Edit from "../views/Edit.vue";
import User from "../views/User.vue";
import Profile from "../views/Profile.vue";
import PendingBoard from "../views/PendingBoard.vue";
import Translate from "../views/Translate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/pend_board",
    name: "pend",
    component: PendingBoard,
  },
  {
    path: "/pend_board/:postId/translate",
    name: "translate",
    component: Translate,
    props: true,
  },
  {
    path: "/map",
    name: "map",
    component: Map,
  },
  {
    path: "/search/:category",
    name: "search",
    component: Search,
  },
  {
    path: "/result/:category",
    name: "result",
    component: Result,
    props: true,
  },
  {
    path: "/search/:postId",
    name: "details",
    component: Details,
    props: true,
  },
  {
    path: "/user/:userId",
    name: "user",
    component: User,
    props: true,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/user/:userId/profile",
    name: "profile",
    component: Profile,
    props: true,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/user/:userId/new",
    name: "newpost",
    component: NewPost,
    props: true,
  },
  {
    path: "/user/:userId/:postId",
    name: "mypost",
    component: MyPost,
    props: true,
  },
  {
    path: "/user/:userId/:postId/edit",
    name: "edit",
    component: Edit,
    props: true,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
