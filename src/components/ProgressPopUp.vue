<template>
  <div class="progressPopUp"></div>
</template>
<script>
export default {
  name: "progressPopUp",
  components: {},
  data() {
    return {};
  },
  computed: {
    progress() {
      return this.$store.getters.progress;
    }
  }
};
</script>
<style scoped></style>
