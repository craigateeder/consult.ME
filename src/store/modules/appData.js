const appData = {
  namespaced: true,

  state: () => ({
    stepsComplete: [],
    currentStep: 1,
    reloadState: false,
    currentBand: ["", ""],
    activeBand: 0
  }),
  mutations: {
    addStep: (state, value) => {
      state.stepsComplete.push(value);
    },
    increaseCurrentStep: state => {
      state.currentStep++;
    },
    decreaseCurrentStep: state => {
      state.currentStep--;
    },
    setReloadState: state => {
      state.reloadState = true;
    },
    changeActiveBand: (state, value) => {
      state.activeBand = value;
    },
    addNumberToBand: (state, payload) => {
      state.currentBand.splice(payload.index, 1, payload.value);
    },
    removeNumberFromBand: (state, payload) => {
      state.currentBand.splice(payload.index, 1, payload.value);
    },
    changeCurrentBand: (state, value) => {
      state.currentBand = value;
    }
  },
  actions: {
    updateProgress({ commit, state }, value) {
      if (!state.stepsComplete.includes(value)) {
        commit("addStep", value);
      }
    },
    moveForward({ commit, state }) {
      let nextStep = state.currentStep;
      nextStep++;
      let lastStep = [...state.stepsComplete].pop();
      lastStep++;
      if (nextStep <= lastStep) {
        commit("increaseCurrentStep");
      }
    },
    moveBack({ commit, state }) {
      let previouseStep = state.currentStep;
      previouseStep--;
      if (previouseStep > 0) {
        commit("decreaseCurrentStep");
      }
    },
    reload({ commit }) {
      commit("setReloadState");
      location.reload();
    },
    changeActiveBand({ commit, state, dispatch, rootGetters }, payload) {
      let nextBand = rootGetters["userData/lengths"][payload.index];
      if (payload.addToLengths) {
        let payload2 = {
          index: state.activeBand,
          value: state.currentBand
        };
        dispatch("userData/addBandToLengths", payload2, { root: true });
      }
      commit("changeActiveBand", payload.index);
      commit("changeCurrentBand", nextBand);
    },
    addNumberToBand({ commit, state }, value) {
      let payload = {
        index: Number,
        value: String
      };
      if (state.currentBand[0] === "") {
        payload.index = 0;
        payload.value = value;
        commit("addNumberToBand", payload);
      } else if (state.currentBand[1] === "") {
        payload.index = 1;
        payload.value = value;
        commit("addNumberToBand", payload);
      } else {
        payload.index = 1;
        let current = state.currentBand[1] + value;
        payload.value = current;
        commit("addNumberToBand", payload);
      }
    },
    removeNumberFromBand({ commit, state }) {
      let payload = {
        index: Number,
        value: String
      };
      if (state.currentBand[1] === "") {
        payload.index = 0;
        payload.value = "";
        commit("removeNumberFromBand", payload);
      } else {
        payload.index = 1;
        let current = state.currentBand[1].slice(0, -1);
        payload.value = current;
        commit("removeNumberFromBand", payload);
      }
    }
  },
  getters: {
    stepsComplete: state => {
      return state.stepsComplete;
    },
    currentStep: state => {
      return state.currentStep;
    },
    completedStep: state => {
      if ([...state.stepsComplete].includes(state.currentStep)) {
        return true;
      } else {
        return false;
      }
    },
    currentBand: state => {
      return state.currentBand;
    },
    activeBand: state => {
      return state.activeBand;
    }
  }
};
export default appData;
