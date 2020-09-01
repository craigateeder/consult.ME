<template>
  <div class="navBar">
    <button class="back-button" v-if="showBackButton" @click="backPressed">
      &lt;
    </button>
    <button class="reload-button" v-if="showReloadButton" @click="reload">
      R
    </button>
    <button
      id="forward-button"
      v-if="showForwardButton"
      @click="forwardPressed"
    >
      &gt;
    </button>
  </div>
</template>
<script>
export default {
  name: "navigationBar",
  components: {},
  data() {
    return {
      showBackButton: false,
      showForwardButton: false,
      showReloadButton: false
    };
  },
  computed: {
    currentStep() {
      return this.$store.getters["appData/currentStep"];
    },
    stepsComplete() {
      return [...this.$store.getters["appData/stepsComplete"]];
    }
  },
  methods: {
    backButtonShow() {
      if (this.currentStep > 1) {
        this.showBackButton = true;
        this.showReloadButton = true;
      } else {
        this.showBackButton = false;
      }
    },
    backPressed() {
      this.$store.dispatch("appData/moveBack");
    },
    forwardButtonShow() {
      let lastStep = [...this.stepsComplete].pop();
      if (this.currentStep <= lastStep) {
        this.showForwardButton = true;
      } else {
        this.showForwardButton = false;
      }
    },
    forwardPressed() {
      this.$store.dispatch("appData/moveForward");
    },
    reload() {
      this.$store.dispatch("appData/reload");
    }
  },
  watch: {
    currentStep() {
      this.backButtonShow();
      this.forwardButtonShow();
    }
  },
  mounted() {
    this.backButtonShow();
    this.forwardButtonShow();
  }
};
</script>
<style scoped>
.navBar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  font-size: 3em;
}
.back-button {
  grid-column: 1 / 2;
}
.reload-button {
  grid-column: 2 / 3;
}
.forward-button {
  grid-column: 3 / 4;
}
</style>
