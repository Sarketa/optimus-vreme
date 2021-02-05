import Vue from "vue";
import App from "./App.vue";
import header from "./components/header.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  comments: {
    header,
  },
}).$mount("#app");
