import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import appData from "@/store/modules/appData.js";
import userData from "@/store/modules/userData.js";
import colourData from "@/store/modules/colourData";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appData,
    userData,
    colourData
  },
  plugins: [
    createPersistedState({
      key: "vuex",
      storage: window.sessionStorage,
      reducer(state) {
        if (state.appData.reloadState === true) {
          return {};
        } else {
          return state;
        }
      }
    })
  ]
});
