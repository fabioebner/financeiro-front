<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.$router.beforeEach((to, from, next) => {
      if (this.$store.getters.isLogado) {
        next();
      } else {
        console.log('para para para para');
        debugger;
      }
    });
  },
};
</script>

<style>
</style>
