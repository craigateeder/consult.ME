<template>
  <div class="input">
    <div class="grey-container">
      <div class="grey-percent" v-if="showGrey">G:{{ grey }}%</div>
    </div>
    <div class="base-container" v-if="showNatural">
      <div class="base-number">{{ natural }}</div>
    </div>
    <div class="lengths-array" v-if="currentStep == 3">
      <input-bar-band-container
        v-for="(band, index) in lengthsArray"
        :key="index"
        :index="index"
        :ref="'bnd' + index"
        @band-clicked="changeActiveBand"
      />
    </div>
    <div
      class="lengthsArray-button-container" 
      v-if="currentStep == 3 && !virgin"
    >
      <button
        class="add-band"
        v-if="lengthsArrayLength <= 7"
        @click="addBandToLengths"
      >
        +
      </button>
      <button
        class="remove-band"
        v-if="lengthsArrayLength > 1"
        @click="removeBandFromLengths"
      >
        -
      </button>
    </div>
    <div class="desired-colour" v-if="currentStep == 4"></div>
  </div>
</template>
<script>
import InputBarBandContainer from "@/components/InputBarBandContainer.vue";

export default {
  name: "inputBar",
  components: {
    InputBarBandContainer
  },
  data() {
    return {};
  },
  methods: {
    focus(index) {
      this.$refs["bnd" + index][0].$el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    },
    addBandToLengths() {
      let index = this.activeBand;
      if (this.lengthsArrayLength != 0) {
        index++;
      }
      this.$store.commit("userData/addNewLengthsArray", index);
      this.changeActiveBand(index);
    },
    removeBandFromLengths() {
      let index;
      index = this.activeBand;
      if (this.lengthsArrayLength == this.activeBand + 1) {
        index--;
      }
      this.$store.commit("userData/removeLengthsArray", this.activeBand);
      this.changeActiveBand(index, false);
    },
    changeActiveBand(index, addToLengths) {
      let payload = {
        index: Number(index),
        addToLengths: addToLengths
      };
      this.$store.dispatch("appData/changeActiveBand", payload);
      this.$nextTick(() => this.focus(index));
    }
  },
  computed: {
    currentStep() {
      return this.$store.getters["appData/currentStep"];
    },
    natural() {
      return this.$store.getters["userData/naturalBase"];
    },
    grey() {
      return this.$store.getters["userData/greyPercent"];
    },
    showGrey() {
      if (this.grey != null) {
        if (this.grey != 0) {
          return true;
        }
      }
      return false;
    },
    showNatural() {
      if (this.natural != null) {
        if (this.natural != 0) {
          return true;
        }
      }
      return false;
    },
    lengthsArray() {
      return this.$store.getters["userData/lengths"];
    },
    lengthsArrayLength() {
      return this.$store.getters["userData/lengthsLength"];
    },
    virgin() {
      return this.$store.getters["userData/virgin"];
    },
    activeBand() {
      return Number(this.$store.getters["appData/activeBand"]);
    }
  },
  watch: {
    currentStep() {
      if (this.currentStep === 3) {
        if (this.lengthsArrayLength == 0) {
          if (!this.virgin) {
            this.addBandToLengths();
          }
        }
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.input {
  display: grid;
  grid-template-columns: min-content 1fr 60px;
  grid-template-rows: 22px 68px;
  color: rgb(207, 238, 248);
}
.base-number {
  z-index: 2;
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
}
.grey-container {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.grey-percent {
  margin-left: 10px;
  margin-right: 10px;
}
.base-container {
  font-size: 3em;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lengths-array {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  justify-content: stretch;
  align-content: center;
  grid-template-columns: repeat(8, min-content);
  grid-template-rows: 1fr;
  overflow: hidden;
  overflow-x: scroll;
  font-size: 2em;
}
::-webkit-scrollbar {
  display: none;
}
.lengthsArray-button-container {
  grid-column: 3 / 4;
  grid-row: 1 / 3;
  font-size: 3em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
@media (max-width: 350px) {
  .input {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 30px 55px;
  }
  .base-number {
    margin-left: 10px;
    margin-right: 10px;
  }
  .grey-percent {
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
