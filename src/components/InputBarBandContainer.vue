<template>
  <div
    class="band-container"
    @click="$emit('band-clicked', index)"
    :class="[activeBand ? 'active-band' : '']"
  >
    <div class="number">{{ number }}</div>
    <div v-if="isEmpty" class="H-line"></div>
  </div>
</template>
<script>
export default {
  name: "bandContainer",
  props: {
    index: Number
  },
  data() {
    return {};
  },
  methods: {
    constructNumber(array) {
      if (array[1] == "") {
        return array[0].toString();
      } else {
        return array[0].toString() + "." + array[1].toString();
      }
    },
    active() {
      this.$store.dispatch("appData/changeActiveBand", this.index);
    }
  },
  computed: {
    current() {
      return this.$store.getters["userData/lengths"][this.index];
    },
    currentEdit() {
      return this.$store.getters["appData/currentBand"];
    },
    activeBand() {
      if (this.$store.getters["appData/activeBand"] === this.index) {
        return true;
      } else {
        return false;
      }
    },
    number() {
      return this.constructNumber(this.current);
    },
    isEmpty() {
      if (this.current[0] == "") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped>
.band-container {
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
}
.number {
  height: 90%;
  padding-left: 5px;
  padding-right: 5px;
  min-width: 60px;
}
.active-band {
  background-color: rgb(184, 113, 184);
}
.H-line {
  width: 70px;
  border-bottom: 5px solid rgb(167, 165, 165);
  margin-bottom: -6px;
}
</style>
