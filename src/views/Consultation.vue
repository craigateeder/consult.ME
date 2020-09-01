<template>
  <div class="consultation container">
    <input-bar v-if="currentStep > 1" />
    <application class="card" v-if="currentStep == 1" />
    <natural class="card" v-if="currentStep == 2" />
    <lengths class="card" v-if="currentStep == 3" />
    <desired-colour class="card" v-if="currentStep == 4" />
    <navigation-bar />
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import Application from "./Application.vue";
import Natural from "./Natural.vue";
import Lengths from "./Lengths.vue";
import InputBar from "@/components/InputBar.vue";
import DesiredColour from "./DesiredColour.vue";

export default {
  name: "Consultation",
  components: {
    NavigationBar,
    Application,
    Natural,
    Lengths,
    InputBar,
    DesiredColour
  },
  data() {
    return {};
  },
  computed: {
    currentStep() {
      return this.$store.getters["appData/currentStep"];
    }
  },
  watch: {}
};
</script>
<style>
.consultation {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(10px, 30px) minmax(100px, 120px) minmax(200px, 1fr) 80px;
  background-color: pink;
}
.navBar {
  grid-row: 4 / 5;
}
.card {
  grid-row: 3 / 4;
  max-width: 100%;
}
.input {
  grid-row: 2 / 3;
}
button {
  border: 1px solid black;
  margin: 10px;
  height: 100px;
  width: 100px;
  background-color: lightblue;
  color: white;
  border-radius: 2em;
}
@media (max-width: 600px) {
  button {
    height: 60px;
    width: 60px;
  }
}
@media (max-width: 350px) {
  button {
    width: 42px;
    height: 42px;
  }
  .consultation {
    grid-template-rows: 10px 85px minmax(200px, 1fr) 60px;
  }
  .application {
    grid-row: 2 / 4;
  }
}
</style>
