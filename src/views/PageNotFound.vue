<template>
  <div class="page-not-found">
    <h1>Nothing to see here...</h1>
    <router-link to="/"><h2>Move along...</h2></router-link>
  </div>
</template>
<script>
export default {
  name: "page-not-found",
  components: {},
  data() {
    return {};
  }
}
</script>
<style scoped>
.page-not-found {
  display: grid;
  grid-template-columns: 10px auto 10px;
  grid-template-rows: 10px 100px auto 10px;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  border: 0;
}
h1 {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
a {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
</style>
