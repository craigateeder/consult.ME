<template>
  <div class="desired-colour">
    {{ highestLift }}
    <number-pad :currentBand="desiredColour" :disabledButtons="[highestLift]" />
  </div>
</template>
<script>
import NumberPad from "@/components/NumberPad.vue";

export default {
  name: "DesiredColour",
  components: {
    NumberPad
  },
  data() {
    return {};
  },
  methods: {
    darkestBand() {
      let darkestBand = null;
      for (let i = 0; i < this.lengths.length; i++) {
        let base = Number(this.lengths[i][0]);
        if (darkestBand == null) {
          darkestBand = base;
        } else if (darkestBand > base) {
          darkestBand = base;
        }
      }
      return darkestBand;
    },
    naturalHighestLift() {
      let highestLift = Number(this.naturalBase);
      if (this.naturalBase <= 4) {
        highestLift += 2;
      } else {
        highestLift += 3;
      }
      return highestLift;
    }
  },
  computed: {
    desiredColour() {
      return this.$store.getters["userData/desiredColour"];
    },
    lengths() {
      return this.$store.getters["userData/lengths"];
    },
    naturalBase() {
      return this.$store.getters["userData/naturalBase"];
    },
    virgin() {
      return this.$store.getters["userData/virgin"];
    },
    highestLift() {
      if (this.virgin) {
        return this.naturalHighestLift();
      } else if (this.darkestBand() < this.naturalHighestLift()) {
        return this.darkestBand() + 2;
      } else {
        return this.naturalHighestLift();
      }
    }
  },
  created() {
    if (!this.$store.getters["colourData/realColoursLoaded"]) {
      this.$store.commit("colourData/loadColourArray");
    }
  }
};
</script>
<style></style>
