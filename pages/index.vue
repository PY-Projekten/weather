<template>
  <v-row justify="center" align="center">
    <v-col>
      <WeatherQueryVue/>
    </v-col>
  </v-row>
</template>

<script>
import WeatherQueryVue from '../components/WeatherQuery.vue';
export default {
  name: 'IndexPage',
  components: {
    WeatherQueryVue
  }
}
</script>
