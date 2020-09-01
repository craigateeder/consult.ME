<template>
  <div class="lengths">
    <porosity-sensetivity
      @ps-detail="showNumberPad = false"
      @ps-mini="showNumberPad = true"
    />
    <number-pad
      v-if="showNumberPad"
      :currentBand="currentBand"
      @button-selected="addToCurrentBand"
      @remove-number="removeFromCurrentBand"
    />
  </div>
</template>
<script>
import NumberPad from "@/components/NumberPad.vue";
import PorositySensetivity from "@/components/PorositySensetivity.vue";

export default {
  name: "Lengths",
  components: {
    NumberPad,
    PorositySensetivity
  },
  data() {
    return {
      showNumberPad: true
    };
  },
  methods: {
    addToCurrentBand(no) {
      if (this.currentBand[1].length < 4) {
        this.$store.dispatch("appData/addNumberToBand", no.toString());
      }
    },
    removeFromCurrentBand() {
      this.$store.dispatch("appData/removeNumberFromBand");
    },
    lengthsValidation() {
      let result = false;
      for (let i = 0; i < this.lengths.length; i++) {
        let bandArray = this.lengths[i];
        console.log(bandArray)
        if (Array.isArray(bandArray)) {
          if (bandArray[1] != "") {
            for (let y = 0; y < bandArray.length; y++) {
              let bandSegment = bandArray[y];
              if (bandSegment.length <= 3 && bandSegment.length >= 1) {
                result = true;
              } else {
                console.log("length failure:", bandSegment);
                return false;
              }
            }
          } else {
            let bandSegment = bandArray[0];
            if (bandSegment.length <= 2 && bandSegment.length >= 1) {
              result = true;
            } else {
              console.log("length failure:", bandSegment)
              return false;
            }
          }
        } else {
          console.log("array failure");
          return false;
        }
      }
      for (let i = 0; i < this.psArray.length; i++) {
        let band = this.psArray[i];
        for (let y = 0; y < band.length; y++) {
          let value = band[y];
          if (value == "normal" || value == "high") {
            result = true;
          } else {
            console.log("PS failure");
            return false;
          }
        }
      }
      return result;
    }
  },
  computed: {
    virgin() {
      return this.$store.getters["userData/virgin"];
    },
    currentBand() {
      return this.$store.getters["appData/currentBand"];
    },
    lengths() {
      return this.$store.getters["userData/lengths"];
    },
    psArray() {
      return this.$store.getters["userData/porositySensetivity"];
    },
    completed() {
      return this.$store.getters["appData/completedStep"];
    }
  },
  watch: {},
  created() {
    if (this.virgin) {
      this.showNumberPad = false;
      if (this.psArray.length == 0) {
        this.$store.commit("userData/addNewPSArray");
      }
    }
  },
  beforeUpdate() {
    if (this.lengthsValidation()) {
      if (!this.completed) {
        this.$store.dispatch("appData/updateProgress", 3);
        this.$store.dispatch("appData/moveForward");
      }
    }
  },
  beforeDestroy() {
    console.log(this.lengthsValidation());
    console.log(this.lengths);
  }
};
</script>
<style scoped>
.lengths {
  display: flex;
  flex-direction: column;
}
.number-pad {
  width: 100%;
  height: 100%;
}
</style>
