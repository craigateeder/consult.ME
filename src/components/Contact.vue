<template>
  <div class="contact">
    <label>name:</label>
    <input :v-model="name" class="name_input" />
    <label>Email:</label>
    <input :v-model="email" class="email-input" />
    <label>message:</label>
    <textarea :v-model="message" class="message-input" />
    <button class="submit-button" @click="sendMessage">SUBMIT</button>
  </div>
</template>
<script>
export default {
  name: "Contact",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      message: ""
    };
  },
  computed: {},
  methods: {
    sendMessage: function() {
      this.$router.push({ path: "/contact/sent" });
    }
  }
};
</script>
<style scoped></style>
