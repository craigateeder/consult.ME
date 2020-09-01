<template>
  <div class="natural">
    <div class="question" v-if="showQuestion()">natural base:</div>
    <grey
      @set-grey="setGreyPercent"
      @grey-picker-active="greyPickerActive = !greyPickerActive"
    />
    <number-pad
      @button-selected="setNaturalBase"
      :activeButton="naturalBase"
      :currentBand="[naturalBase, '']"
    />
  </div>
</template>
<script>
import NumberPad from "@/components/NumberPad.vue";
import Grey from "@/components/Grey.vue";

export default {
  name: "Natural",
  components: {
    NumberPad,
    Grey
  },
  data() {
    return {
      greyPickerActive: false
    };
  },
  methods: {
    setNaturalBase(number) {
      this.$store.commit("userData/changeNaturalBase", number);
      if (this.greyPercent != null) {
        this.nextStep();
      } else {
        this.$store.dispatch("userData/setGreyPercent", 0);
        this.nextStep();
      }
    },
    setGreyPercent(greyNumber) {
      this.$store.dispatch("userData/setGreyPercent", greyNumber);
      if (greyNumber == 100) {
        this.$store.dispatch("userData/setNaturalBase", 0);
        this.nextStep();
      } else if (this.naturalBase != 0 && this.naturalBase != null) {
        this.nextStep();
      }
    },
    nextStep() {
      this.$store.dispatch("appData/updateProgress", 2);
      this.$store.dispatch("appData/moveForward");
    },
    showQuestion() {
      if (this.naturalBase != null) {
        return false;
      } else if (this.greyPickerActive) {
        return false;
      } else {
        return true;
      }
    }
  },
  computed: {
    naturalBase() {
      return this.$store.getters["userData/naturalBase"];
    },
    greyPercent() {
      return this.$store.getters["userData/greyPercent"];
    }
  },
  watch: {}
};
</script>
<style scoped>
.natural {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 4em 60px 1fr;
  justify-content: center;
  align-content: end;
  justify-items: center;
}
.question {
  justify-self: start;
  grid-row: 1 / 2;
  font-size: 2em;
}
.grey {
  grid-row: 2 / 3;
}
.number-pad {
  grid-row: 3 / 4;
}

@media (max-width: 350px) {
  .natural {
    grid-template-rows: 2em 80px 1fr;
  }
}
</style>
