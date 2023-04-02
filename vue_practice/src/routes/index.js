import { createRouter, createWebHashHistory } from "vue-router";
import HomeVue from "@/pages/HomeVue.vue";
export default createRouter({
  //has 모드 : 특정 페이지에서 새로고침 했을때 페이즈를 찾을 수 없음과 같은 알림 방지
  history: createWebHashHistory(),

  routes: [
    {
      path: "/",
      name: HomeVue,
      component: HomeVue,
    },
  ],
});
