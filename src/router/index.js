import Vue from "vue";
import VueRouter from "vue-router";
import LoginRegister from "../views/LoginRegister.vue";
import Blogs from "../views/Blogs.vue";
import BlogEdit from "../views/BlogEdit.vue";
import BlogDetail from "../views/BlogDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    redirect: { name: "LoginRegister" },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
  },
  {
    path: "/login",
    name: "LoginRegister",
    component: LoginRegister,
  },
  {
    path: "/blog/add",
    name: "BlogAdd",
    component: BlogEdit,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/blog/:blogId",
    name: "BlogDetail",
    component: BlogDetail,
  },
  {
    path: "/blog/:blogId/edit",
    name: "BlogEdit",
    component: BlogEdit,
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
