<template>
  <div class="ps-container">
    <div class="mini-display">
      <div class="porosity-mini" @click="psDetail('porosity')">
        Porosity: {{ porosity }}
      </div>
      <div class="sensetivity-mini" @click="psDetail('sensetivity')">
        Sensetivity: {{ sensetivity }}
      </div>
    </div>
    <div v-if="detailActive != ''" class="detail-display">
      <div class="question" v-if="detailActive == 'porosity'">
        What is the result of the porousity test?
      </div>
      <div class="porosity -detail" v-if="detailActive == 'porosity'">
        <input
          type="radio"
          id="normal"
          name="porosity"
          value="normal"
          :checked="porosity == 'normal'"
          @change="updateArray"
        />
        <label for="normal">Normal</label>
        <input
          type="radio"
          id="high"
          name="porosity"
          value="high"
          :checked="porosity == 'high'"
          @change="updateArray"
        />
        <label for="high">High</label>
      </div>
      <div class="question" v-if="detailActive == 'sensetivity'">
        What is the result of the sensetivity test?
      </div>
      <div class="sensetivity -detail" v-if="detailActive == 'sensetivity'">
        <input
          type="radio"
          id="normal"
          name="sensetivity"
          value="normal"
          :checked="sensetivity == 'normal'"
          @change="updateArray"
        />
        <label for="normal">Normal</label>
        <input
          type="radio"
          id="high"
          name="sensetivity"
          value="high"
          :checked="sensetivity == 'high'"
          @change="updateArray"
        />
        <label for="high">High</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PorositySensetivity",
  data() {
    return {
      detailActive: ""
    };
  },
  methods: {
    psDetail(value) {
      if (this.detailActive == value) {
        if (!this.virgin) {
          this.detailActive = "";
          this.$emit("ps-mini");
        }
      } else {
        this.detailActive = value;
        this.$emit("ps-detail");
      }
    },
    updateArray(event) {
      let innerIndex;
      if (this.detailActive == "porosity") {
        innerIndex = 0;
      } else {
        innerIndex = 1;
      }
      let payload = {
        index: Number(this.activeBand),
        innerIndex: innerIndex,
        value: event.target.value
      };
      this.$store.dispatch("userData/addPSArray", payload);
      if (this.detailActive == "porosity") {
        this.psDetail("sensetivity");
      } else {
        this.psDetail(this.detailActive);
      }
    }
  },
  computed: {
    porosity() {
      if (this.porositySensetivity) {
        let porosity = this.porositySensetivity[0];
        if (porosity != "") {
          return porosity;
        }
      }
      return "-";
    },
    sensetivity() {
      if (this.porositySensetivity) {
        let sensetivity = this.porositySensetivity[1];
        if (sensetivity != "") {
          return sensetivity;
        }
      }
      return "-";
    },
    porositySensetivity() {
      let psArray = [...this.$store.getters["userData/porositySensetivity"]];
      if (psArray.length == 0) {
        return false;
      } else {
        return psArray[this.activeBand];
      }
    },
    activeBand() {
      return this.$store.getters["appData/activeBand"];
    },
    virgin() {
      return this.$store.getters["userData/virgin"];
    }
  },
  created() {
    if (this.virgin) {
      this.detailActive = "porosity";
    }
  }
};
</script>
<style scoped>
.ps-container {
  font-size: 1.2em;
}
.mini-display {
  display: flex;
  justify-content: space-evenly;
}
.detail-display {
  display: grid;
  grid-template-rows: 33px 85px max-content 33px;
}
.question {
  min-height: max-content;
  grid-row: 2 / 3;
  place-self: center;
}
.-detail {
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: 30% 70%;
}
.-detail > input {
  grid-column: 1 / 2;
  margin: 10px;
  place-self: center end;
}
.-detail > label {
  place-self: center start;
  margin: 5px;
  grid-column: 2 / 3;
}
</style>
