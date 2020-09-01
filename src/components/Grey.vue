<template>
  <div class="grey">
    <ul class="grey-list" v-show="pickerActive">
      <li
        class="grey-list-item"
        v-for="(no, index) in greyNo"
        :key="index"
        :ref="'g' + index"
      >
        <button
          class="grey-list-item-button"
          @click="$emit('set-grey', no)"
          v-on:click="greyClicked"
          :class="{ active: no === greyPercent }"
        >
          {{ no }}
        </button>
      </li>
    </ul>
    <button class="grey-button" @click="showGreyPicker" v-if="!pickerActive">
      any grey?
    </button>
  </div>
</template>
<script>
export default {
  name: "grey",
  props: {},
  data() {
    return {
      greyNo: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      pickerActive: false
    };
  },
  methods: {
    showGreyPicker() {
      this.pickerActive = true;
      this.$emit("grey-picker-active");
    },
    focus(index) {
      this.$refs["g" + index][0].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    },
    greyClicked() {
      this.focus(this.greyNo.indexOf(this.greyPercent));
    }
  },
  computed: {
    greyPercent() {
      return this.$store.getters["userData/greyPercent"];
    }
  },
  watch: {},
  created() {
    if (this.greyPercent != null) {
      if (this.greyPercent != 0) {
        this.pickerActive = true;
        this.$nextTick(() => this.greyClicked());
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.grey {
  align-self: end;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  width: 85%;
  height: 85%;
  position: relative;
}
.grey::before {
  content: "";
  position: absolute;
  z-index: 1;
  right: 0;
  left: 0;
  bottom: 0;
  pointer-events: none;
  background-image: linear-gradient(to bottom, rgba(255,255,255,0), pink 90%);
  height: 30%;
}
.grey::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(to top, rgba(255,255,255,0), pink 90%);
  height: 30%;
}
.grey-list {
  list-style-type: none;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: grid;
  justify-content: center;
  align-content: start;
  align-items: center;
  justify-items: stretch;
  grid-template-rows: repeat(10, 85%);
  grid-template-columns: 1fr;
  overflow: hidden;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  display: none;
}
.grey-list-item-button {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  margin: 0;
  background: none;
  cursor: pointer;
}
.grey-list-item {
  height: 80px;
  scroll-snap-align: center;
  background: purple;
}
.alert {
  border: 2px solid red;
}
.grey-button {
  z-index: 2;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.grey-list-item-button:active {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>
