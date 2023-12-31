
<template>
  <div>
    <h1>Weather Query</h1>

    <span>My Test: {{ my_test }}</span> <br>
    <span>Test: {{ test }}</span>
    <div>
      <label for="location">Location:</label>
      <v-autocomplete
        id="test-location-input"
        ref="autocomplete"
        v-model="location"
        :items="locationsList"
        @focus="handleFocus"
        @keydown.enter="show_model($event)"
        @keydown.tab="show_model($event)"
        :search-input.sync="searchInput"
        taggable
        placeholder="Select or type a location"
        :rules="rules.location"
      >
        <template v-slot:no-data>
          Data does not yet exist in List.  If you have entered in a new Location, press ENTER
        </template>
      </v-autocomplete>
    </div>

    <div>
      <label for="date">Date:</label>
      <input type="date" v-model="date" />
    </div>

    <div>
      <label for="hour">Hour:</label>
      <select v-model="hour" id="hour">
        <option value="" selected>Select Hour</option>
        <option v-for="h in 23" :key="h" :value="h < 10 ? `0${h}` : h.toString()">
          {{ h < 10 ? `0${h}:00` : `${h}:00` }}
        </option>
      </select>
      <!-- <input type="number" v-model="hour" /> -->
    </div>

    <v-btn type="submit" @click="submitForm">Query</v-btn>


    <div v-if="response_data.length">
      <h2>Results:</h2>
      <table>
        <thead>
        <tr>
          <th>Date</th>
          <th>Hour</th>
          <th>Temperature</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in response_data" :key="item.date + item.hour">
          <td>{{ item.date }}</td>
          <td>{{ item.hour }}</td>
          <td>{{ item.temperature }}</td>
          <td><v-icon>mdi-weather-cloudy</v-icon></td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>No results found.</p>
    </div>
    <template>
      <!-- Dialog for saving location -->
      <v-dialog
        v-model="dialog"
        max-width="1200"
      >
        <v-card>
          <v-card-title>{{ location }} wird gespeichert!<v-spacer/><v-icon @click="dialog=false">mdi-close</v-icon></v-card-title>
          <v-card-text>
            <span>{{ searchInput }}</span>
            <span>{{ location }}</span>
          </v-card-text>
        </v-card>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="dialog=false">Abbrechen</v-btn>
          <v-btn @click="submitForm">Speichern</v-btn>
        </v-card-actions>
      </v-dialog>

      <!-- Dialog for displaying error messages -->
      <v-dialog v-model="errorDialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">Error</v-card-title>
          <v-card-text>{{ popupMessage }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="errorDialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
//import axios from "axios"
import { VAutocomplete } from "vuetify/lib";
//import vSelect from "vue-select";


export default {
  name: 'WeatherQueryOne',

  components: {
    //VAutocomplete
  },
  props: {
    test: Number,
    set_test: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        location: [
          v => !!v || 'Location is required', // Check if the location is not empty
          // // Add more rules for location if needed
        ],
        date: [
          v => !!v || 'Date is required',
          v => /^(\d{4}-\d{2}-\d{2}|\d{2}\.\d{2}\.\d{4})$/.test(v) || 'Invalid date format',
        ],
        hour: [
          v => v === '' || /^(\d{2}:\d{2}(:\d{2})?)$/.test(v) || 'Invalid hour format',
          // Add more rules for hour if needed
        ],
      },
      dialog: false,
      searchInput: '',
      location: '',
      date: new Date().toISOString().slice(0, 10), // Set default date to current date
      hour: '',
      locationsList: [], // populate this list from your API
      response_data: [], // populate this with the query results from your API
      errorMessage: '',
      errorDialog: false,
      saveDialog: false,
      popupMessage: ''
    };
  },
  computed: {
    my_test: {
      get(){
        return this.test
      }
    }
  },
  currentVersion() {
    return 'WeatherQueryOne';
  },
  methods: {
    handleInput(value) {
      this.searchInput = value; // Update the searchInput with the new value
      // You might want to clear the input if a valid location is selected from the suggestions
      if (this.locationsList.includes(value)) {
        this.searchInput = '';
      }
    },
    handleBlur() {

      // Logic to retain the typed input on blur

    },
    handleFocus() {
      // Logic to manage the input on focus
      // Clear any previous selection or error message to prepare for new input
      this.selectedLocation = null;
      this.errorMessage = '';
    },
    noDataResult() {
      console.log('test')
      // Your custom function here, e.g., fetching new locations
      this.fetchNewLocations();
      return 'Fetching new locations...';
    },
    fetchNewLocations() {
      // Placeholder function, you can add functionality here later
      console.log('Fetching new locations...');
    },
    async fetchLocations() {
      try {
        const response = await this.$axios.get('/available_locations/');
        this.locationsList = response.data.locations;
      } catch (error) {
        console.error('An error occurred while fetching the locations:', error);
      }
    },

    async submitForm() {
      console.log('submitForm is triggered');
      this.response_data = []
      console.log("form data:", this.location, this.date, this.hour);

      // New validation logic
      if (!this.validateForm()) {
        this.$store.dispatch('alerts/showToast', {
          content: 'Invalid input',
          color: 'error',
        });
        return;
      }

      try {
        // Define the data to be sent in the POST request
        const postData = {
          location: this.location,
          date: this.date,
          hour: this.hour
        };

        // Make a POST request to the Django backend
        const response = await this.$axios.post('/weather_query/', postData);
        console.log("Response from backend", response);

        // Check if the response indicates success
        if (response.data.status === "success") {
          // Update the data in the Vue component with the received data
          this.response_data = response.data.data.weather;
        } else {
          // Handle the case where the backend response indicates an error
          this.errorMessage = response.data.message; // Display the error message from the backend
          console.error(response.data.message);
        }
        // } catch (error) {
        //   // Handle errors or other issues with the request
        //   if (error.response) {
        //     this.errorMessage = error.response.data.message; //Display the custom message from the backend
        //     console.error('Error:', error.response.data.message);
        //   } else if (error.request) {
        //     // The request was made but no response was received
        //     this.errorMessage = 'No response from the server';
        //     console.error('Error: No response from the server');
        //   } else {
        //     // Something happened in setting up the request that triggered an Error
        //     this.errorMessage = 'Error setting up the request';
        //     console.error('Error:', error.message)
        //   }
        // }
      } catch (error) {
        // Handle errors or other issues with the request
        if (error.response) {
          if (error.response.data.message === 'Location is required') {
            // Specific error handling for 'Location is required'
            //this.showPopup(error.response.data.message);
            this.$store.commit('alerts/SET_TIMEOUT', 1500)
            this.$store.commit('alerts/SHOW_TOAST', {content: error.response.data.message, color: 'error'})
          }
          this.errorMessage = error.response.data.message; //Display the custom message from the backend
          console.error('Error:', error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          this.errorMessage = 'No response from the server';
          console.error('Error: No response from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          this.errorMessage = 'Error setting up the request';
          console.error('Error:', error.message)
        }
      }
    },

    validateForm() {
      const isLocationValid = this.rules.location.every(rule => rule(this.location));
      const isDateValid = this.rules.date.every(rule => rule(this.date));
      const isHourValid = this.rules.hour.every(rule => rule(this.hour));
      return isLocationValid && isDateValid && isHourValid;
    },

    showPopup(message) {
      // Implement the logic to show a popup with the given message
      this.popupMessage = message;
      console.log("Popup message:", message);
      this.dialog = true;
      // Additional code to show popup
    },

    show_model(e){
      e.preventDefault()
      console.log("----------------------------------------",this.$refs.tt)
      console.log("----------------------------------------",this.searchInput)
      this.location = this.searchInput
      if(!this.locationsList.includes(this.searchInput)){
        this.dialog = true
        //this.location = this.searchInput
      }else{
        //this.location = this.searchInput
        this.submitForm()
      }
    }
  },
  created() {
    this.set_test(1)
    this.fetchLocations();

  },

  watch: {
    /* location(newVal, oldVal) {
       // Check if the location has changed
       if (oldVal !== newVal) {
         // Check if the location is in the locationsList and other fields are filled
         if (this.locationsList.includes(newVal) && this.date && this.hour) {
           // Trigger the weather query
           //this.submitForm();
         }else{
           this.location = this.searchInput
           //this.dialog = true
         }
       }
       console.log("---------------SEARCH", this.searchInput)
     }*/
  }
  ,
  mounted() {
    this.$emit('updateVersion', 'WeatherQueryOne');
    console.log("mounted")
    //this.$store.commit('controller/SET_PAGE', 'one')
    /*console.log("created")
    this.$store.commit('alerts/SET_TIMEOUT', 3000)
    this.$store.commit('alerts/SHOW_TOAST', {content: 'CREATED', color: 'error'})*/
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
