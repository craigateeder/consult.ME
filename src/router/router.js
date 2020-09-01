import Vue from "vue";
import vueRouter from "vue-router";
import Consultation from "@/views/Consultation";
import Contact from "@/views/Contact.vue";
import Help from "@/views/Help.vue";
import Home from "@/views/Home.vue";
import PageNotFound from "@/views/PageNotFound.vue";

Vue.use(vueRouter);

const router = new vueRouter({
  mode: "history",
  base: "",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/consultation",
      component: Consultation
    },
    {
      path: "/contact",
      component: Contact
    },
    {
      path: "/help",
      component: Help
    },
    {
      path: "*",
      component: PageNotFound
    }
  ]
});
export default router;
