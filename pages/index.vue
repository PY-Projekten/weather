<template>
  <div>
    <v-row justify="center" align="center">
      <v-col>
        <v-switch @change="switchPage"/>
        <!-- Displaying the current version -->
        <span>Current Version: {{ currentVersion }}</span>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col>
        <weather-query-one v-if="page === 'one'" :test="test" :set_test="set_test" @updateVersion="updateCurrentVersion"/>
        <weather-query-vue-two v-else-if="page === 'two'" :test="test" :set_test="set_test" @updateVersion="updateCurrentVersion"/>
        <weather-query-vue-three v-else-if="page === 'three'" :test="test" :set_test="set_test" @updateVersion="updateCurrentVersion"/>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import WeatherQueryOne from "@/components/WeatherQueryOne.vue";
import WeatherQueryVueTwo from "@/components/WeatherQueryVueTwo.vue";
import WeatherQueryVueThree from "@/components/WeatherQueryVueThree.vue";

export default {
  name: 'IndexPage',
  components: {
    WeatherQueryOne,
    WeatherQueryVueTwo,
    WeatherQueryVueThree
  },
  created() {
    this.test = 10;
  },
  mounted() {
    this.test = 8;
  },
  beforeMount() {
    this.test = 0;
  },
  data() {
    return {
      test: 9
    };
  },
  computed: {
    page() {
      return this.$store.state.controller.page;
    },
    currentVersion() {
      switch (this.page) {
        case 'one': return 'WeatherQueryOne';
        case 'two': return 'WeatherQueryVueTwo';
        case 'three': return 'WeatherQueryVueThree'; // Add this case
        default: return 'Unknown';
      }
    }
  },
  methods: {
    // ... your existing methods ...
    updateCurrentVersion(version) {
      this.currentVersion = version;
    },
    set_test(val) {
      this.test = val;
    },
    switchPage() {
      let newPage = 'one';
      if (this.page === 'one') {
        newPage = 'two';
      } else if (this.page === 'two') {
        newPage = 'three';
      } else if (this.page === 'three') {
        newPage = 'one';
      }
      this.$store.commit('controller/SET_PAGE', newPage);
    }
  }
}
</script>
