<template>
  <div class="application">
    <transition name="slide">
      <virgin-application
        :complete="virginComplete"
        @set-virgin="setVirgin"
        v-show="this.showLongRegrowth === false"
      />
    </transition>
    <transition name="slide">
      <long-regrowth-application
        :complete="longRegrowthComplete"
        @set-long-regrowth="setLongRegrowth"
        v-show="this.showLongRegrowth"
      />
    </transition>
  </div>
</template>

<script>
import VirginApplication from "@/components/VirginApplication.vue";
import LongRegrowthApplication from "@/components/LongRegrowthApplication.vue";

export default {
  name: "Application",
  components: {
    VirginApplication,
    LongRegrowthApplication
  },
  data() {
    return {
      virginComplete: false,
      longRegrowthComplete: false
    };
  },
  computed: {
    virgin() {
      return this.$store.getters["userData/virgin"];
    },
    showLongRegrowth() {
      if (this.virginComplete) {
        if (!this.virgin) {
          return true;
        }
      }
      return false;
    },
    completed() {
      return this.$store.getters["appData/completedStep"];
    }
  },
  methods: {
    setVirgin(bool) {
      this.$store.dispatch("userData/setVirgin", bool);
      this.virginComplete = true;
      if (this.virgin) {
        this.longRegrowthComplete = true;
        this.$store.dispatch("appData/updateProgress", 1);
        this.$store.dispatch("appData/moveForward");
      }
    },
    setLongRegrowth(bool) {
      this.$store.dispatch("userData/setLongRegrowth", bool);
      this.LongRegrowthComplete = true;
      if (this.virginComplete) {
        this.$store.dispatch("appData/updateProgress", 1);
        this.$store.dispatch("appData/moveForward");
      }
    }
  },
  watch: {},
  created() {
    if (this.completed) {
      this.longRegrowthComplete = true;
      this.virginComplete = true;
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
