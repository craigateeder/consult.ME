<template>
  <div class="virgin">
    <label><h1>Is this a virgin hair application?</h1></label>
    <button
      v-on:click="$emit('set-virgin', true)"
      name="yesButton"
      class="button-input"
      :class="{ active: yesButtonActive }"
    >
      YES
    </button>
    <button
      v-on:click="$emit('set-virgin', false)"
      name="noButton"
      class="button-input"
      :class="{ active: noButtonActive }"
    >
      NO
    </button>
  </div>
</template>
<script>
export default {
  name: "virginApplication",
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
    virgin() {
      return this.$store.getters["userData/virgin"];
    }
  },
  watch: {},
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
        if (this.virgin === false) {
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
