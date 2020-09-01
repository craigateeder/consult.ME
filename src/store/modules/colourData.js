import colourArray from "../lorealcolourobjects.js";

const colourData = {
  namespaced: true,
  state: () => ({
    naturalBaseNumbers: [
      { number: 1, id: "n1" },
      { number: 2, id: "n2" },
      { number: 3, id: "n3" },
      { number: 4, id: "n4" },
      { number: 5, id: "n5" },
      { number: 6, id: "n6" },
      { number: 7, id: "n7" },
      { number: 8, id: "n8" },
      { number: 9, id: "n9" },
      { number: 10, id: "n10" }
    ],
    toneNumbers: [
      { number: 1, id: "t9" },
      { number: 2, id: "t2" },
      { number: 3, id: "t3" },
      { number: 4, id: "t4" },
      { number: 5, id: "t5" },
      { number: 6, id: "t6" },
      { number: 7, id: "t7" },
      { number: 8, id: "t8" },
      { number: 0, id: "t0" }
    ],
    realColours: null
  }),
  mutations: {
    loadColourArray: state => {
      state.realColours = colourArray;
    }
  },
  actions: {},
  getters: {
    naturalBaseNumbers: state => {
      return [...state.naturalBaseNumbers];
    },
    toneNumbers: state => {
      return [...state.toneNumbers];
    },
    realColoursLoaded: state => {
      if (state.realColours == null) {
        return false;
      }
      return true;
    }
  }
};

export default colourData;
