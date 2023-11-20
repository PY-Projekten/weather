<template>
  <v-container fluid>
    <v-snackbar v-model="show"
                :color="color"
                :timeout="timeout"
                style="z-index: 100010"
                width="900"
                height="24px"
                bottom centered
                class="mt-04 mb-0 pb-0 pt-0"
    >
      <v-row no-gutters  justify="center" class="mt-0 mb-0 pb-0 pt-0">
        <v-col cols="10" md="10" class="mt-0 mb-0 pb-0 pt-0">
          <!--      <v-flex shrink>
                  <v-icon dense class="mr-2" v-if="icon" v-text="icon"/>
                </v-flex>-->
          <v-flex grow  style="text-align: start; font-size: 12px" class="mt-4 mb-0 pb-0 pt-0">
            {{message}}
          </v-flex>

        </v-col>
        <v-col cols="2" md="2">
          <v-layout justify-end class="pt-2 px-0">
            <v-btn  text outlined @click="show = false" style="text-align: right">
              <v-icon small >{{ icons['mdi-close'] }}</v-icon>
            </v-btn>
          </v-layout>
        </v-col>
      </v-row>


    </v-snackbar>
  </v-container>
</template>

<script>
import {mdiClose} from '@mdi/js';
export default {
  name: "Toaster",
  data () {
    return {
      show: false,
      message: '',
      color: '',
      icons: {
        "mdi-close": mdiClose
      }
    }
  },
  computed: {
    timeout: {
      get(){
        return this.$store.state.alerts.timeout
      }
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'alerts/SHOW_TOAST') {
        this.message = state.alerts.toast.content
        this.color = state.alerts.toast.color
        this.show = true
      }
    })
  }
}
</script>

<style scoped>

</style>
