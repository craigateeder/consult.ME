const userData = {
  namespaced: true,

  state: () => ({
    brand: "",
    virgin: false,
    longRegrowth: false,
    naturalBase: null,
    greyPercent: null,
    desiredColour: ["", ""],
    porositySensetivity: [],
    lengths: []
  }),
  mutations: {
    toggleVirgin: state => {
      state.virgin = !state.virgin;
    },
    toggleLongRegrowth: state => {
      state.longRegrowth = !state.longRegrowth;
    },
    changeNaturalBase: (state, value) => {
      state.naturalBase = value;
    },
    changeGreyPercent: (state, value) => {
      state.greyPercent = value;
    },
    updateLengthsArray: (state, payload) => {
      state.lengths.splice(payload.index, 1, payload.value);
    },
    addNewLengthsArray: (state, index) => {
      state.lengths.splice(index, 0, ["", ""]);
      state.porositySensetivity.splice(index, 0, ["", ""]);
    },
    addNewPSArray: state => {
      state.porositySensetivity.splice(0, 0, ["", ""]);
    },
    removeLengthsArray: (state, index) => {
      state.lengths.splice(index, 1);
      state.porositySensetivity.splice(index, 1);
    },
    updatePSArray: (state, payload) => {
      state.porositySensetivity.splice(payload.index, 1, payload.value);
    }
  },
  actions: {
    setVirgin({ commit, state }, value) {
      if (state.virgin != value) {
        commit("toggleVirgin");
      }
    },
    setLongRegrowth({ commit, state }, value) {
      if (state.longRegrowth != value) {
        commit("toggleLongRegrowth");
      }
    },
    setNaturalBase({ commit, state }, value) {
      if (state.naturalBase != value) {
        commit("changeNaturalBase", value);
      }
    },
    setGreyPercent({ commit, state }, value) {
      if (state.greyPercent != value) {
        commit("changeGreyPercent", value);
      }
    },
    addBandToLengths({ commit, state }, payload) {
      let bandBase = payload.value[0].toString();
      let bandTone = payload.value
        .slice(1)
        .toString()
        .replace(",", "");
      let request = {
        index: Number(payload.index),
        value: [bandBase, bandTone]
      };
      if (state.lengths.length > request.index) {
        commit("updateLengthsArray", request);
      }
    },
    addPSArray({ state, dispatch }, request) {
      let last = state.porositySensetivity.slice(-1)[0];
      if (last[request.innerIndex] == "") {
        for (let i = 0; i < state.porositySensetivity.length; i++) {
          request.index = i;
          dispatch("commitPSArray", request);
        }
      } else {
        dispatch("commitPSArray", request);
      }
    },
    commitPSArray({ state, commit }, request) {
      let band = state.porositySensetivity[request.index];
      band[request.innerIndex] = request.value;
      let payload = {
        index: request.index,
        value: band
      };
      commit("updatePSArray", payload);
    }
  },
  getters: {
    virgin: state => {
      return state.virgin;
    },
    longRegrowth: state => {
      return state.longRegrowth;
    },
    naturalBase: state => {
      return state.naturalBase;
    },
    greyPercent: state => {
      return state.greyPercent;
    },
    lengths: state => {
      return state.lengths;
    },
    lengthsLength: state => {
      return Number(state.lengths.length);
    },
    porositySensetivity: state => {
      return state.porositySensetivity;
    },
    desiredColour: state => {
      return state.desiredColour;
    }
  }
};
export default userData;
