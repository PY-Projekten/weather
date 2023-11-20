<script >
export default {
  name: 'WeatherQueryTwo',
  mounted() {
    console.log("mounted")
    this.$store.commit('controller/SET_PAGE', 'two')
  }
}
</script>

<template>

</template>

<style scoped>

</style>
