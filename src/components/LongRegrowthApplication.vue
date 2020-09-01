<template>
  <div class="longRegrowth">
    <label><h1>Is this a long regrowth application?</h1></label>
    <button
      @click="$emit('set-long-regrowth', true)"
      id="yesButton"
      class="buttonInput"
      :class="{ active: yesButtonActive }"
    >
      YES
    </button>
    <button
      @click="$emit('set-long-regrowth', false)"
      id="noButton"
      class="buttonInput"
      :class="{ active: noButtonActive }"
    >
      NO
    </button>
  </div>
</template>
<script>
export default {
  name: "longRegrowthApplication",
  props: {
    complete: Boolean
  },
  data() {
    return {
      yesButtonActive: false,
      noButtonActive: false
    };
  },
  computed: {
    longRegrowth() {
      return this.$store.getters["userData/longRegrowth"];
    },
    stepsComplete() {
      return [...this.$store.getters["appData/stepsComplete"]];
    }
  },
  methods: {
    toggleYesActive() {
      this.noButtonActive = false;
      this.yesButtonActive = true;
    },
    toggleNoActive() {
      this.yesButtonActive = false;
      this.noButtonActive = true;
    },
    updateActiveClass() {
      if (this.complete) {
        if (this.longRegrowth == false) {
          this.toggleNoActive();
        } else {
          this.toggleYesActive();
        }
      }
    }
  },
  created() {
    this.updateActiveClass();
  },
  mounted() {}
};
</script>
<style scoped></style>
