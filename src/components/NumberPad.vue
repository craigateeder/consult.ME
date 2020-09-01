<template>
  <div class="number-pad">
    <button
      class="button"
      v-for="(number, i) in numbers"
      :key="i"
      :ref="number.id"
      :class="{ active: number.number === activeButton }"
      @click="$emit('button-selected', number.number)"
    >
      {{ number.number }}
    </button>
    <button
      v-if="showEDKey()"
      class="delete-button utility-key"
      @click="$emit('remove-number')"
    >
      &#9003;
    </button>
    <button
      v-if="showEDKey()"
      class="submit-button utility-key"
      @click="$emit('submit-number')"
    >
      >
    </button>
  </div>
</template>
<script>
export default {
  name: "NumberPad",
  props: {
    currentBand: Array,
    utilityButtons: {
      type: Boolean,
      required: false
    },
    activeButton: {
      type: Number,
      required: false
    },
    disabledButtons: {
      type: Array,
      default() {
        return [];
      },
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    showEDKey() {
      if (this.currentBand[0] != null) {
        if (this.currentBand[0] != "") {
          return true;
        }
      }
      return false;
    },
    baseNumbers() {
      return this.$store.getters["colourData/naturalBaseNumbers"];
    },
    toneNumbers() {
      return this.$store.getters["colourData/toneNumbers"];
    },
    disableButtons() {
      if (this.disabledButtons[0] !== undefined) {
        for (let i = 0; i < this.numbers.length; i++) {
          var button = this.numbers[i];
          if (this.disabledButtons < button.number) {
            this.$refs[button.id][0].setAttribute("disabled", "");
          } else {
            this.$refs[button.id][0].removeAttribute("disabled");
          }
        }
      }
    }
  },
  computed: {
    numbers() {
      if (this.currentBand[0] == null || this.currentBand[0] == "") {
        return this.baseNumbers();
      } else {
        return this.toneNumbers();
      }
    }
  },
  watch: {},
  mounted() {
    this.disableButtons();
  }
};
</script>
<style scoped>
.number-pad {
  margin: 0;
  padding: 0;
  border: 0;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 84px);
  grid-template-rows: repeat(4, 84px);
}
#n10 {
  grid-row: 4 / 5;
  grid-column: 2 / 3;
}
.button {
  outline: none;
  margin: 2px;
  box-shadow: 0px 5px 10px 5px rgb(189, 186, 186);
  transition: all 0.1s;
  cursor: auto;
  width: 50px;
  height: 50px;
}
.button:active {
  background-color: rgb(184, 113, 184);
  box-shadow: 0px 4px 8px grey;
  transform: scale(0.98);
}
.button.active {
  background-color: rgb(184, 113, 184);
}
.button:disabled {
  background-color: rgb(189, 189, 189);
  box-shadow: 0px 4px 8px grey;
}
#t0 {
  grid-row: 4 / 5;
  grid-column: 2 / 3;
}
.utility-key {
  font-size: 1.5em;
  color: black;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.delete-button {
  grid-row: 4 / 5;
  grid-column: 1 / 2;
}
.submit-button {
  grid-row: 4 / 5;
  grid-column: 3 / 4;
}
@media (max-width: 350px) {
  .number-pad {
    grid-template-columns: repeat(3, 73px);
    grid-template-rows: repeat(4, 70px);
  }
}
</style>
