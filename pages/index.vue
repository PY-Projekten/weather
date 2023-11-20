<template>
  <div>
    <v-row justify="center" align="center">
      <v-col>
        <v-switch @change="switchPage"/>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col>
        <weather-query-one v-if="page === 'one'" :test="test" :set_test="set_test"/>
        <weather-query-vue-two v-else-if="page === 'two'" :test="test" :set_test="set_test"/>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import WeatherQueryVue from '../components/WeatherQueryOne.vue';
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
  computed: {
    page: {
      get(){
        return this.$store.state.controller.page
      }
    }
  },
  data(){
    return {
        test: 9
    }
  },
  methods: {
    set_test(val){
      this.test = val
    },
    switchPage(){
      if(this.page === 'one'){
        this.$store.commit('controller/SET_PAGE', 'two')
      }else{
        this.$store.commit('controller/SET_PAGE', 'one')
      }
    }
  }
}
</script>
