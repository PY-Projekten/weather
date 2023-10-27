<template>
  <v-row justify="center" align="center">
    <v-col>
      <WeatherQueryVue :test="test" :set_test="set_test"/>
    </v-col>
  </v-row>
</template>

<script>
import WeatherQueryVue from '../components/WeatherQuery.vue';
export default {
  name: 'IndexPage',
  components: {
    WeatherQueryVue
  },
  created() {
    this.test = 10
  },
  mounted() {
    this.test = 8
  },
  beforeMount() {
    this.test = 0
  },
  data(){
    return {
        test: 9
    }
  },
  methods: {
    set_test(val){
      this.test = val
    }
  }
}
</script>
