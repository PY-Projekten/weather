<!-- <template>
  <div>
    <h1>Weather Query</h1>

    <form @submit.prevent="submitForm">
      <div>
        <label for="location">Location:</label>
        <v-autocomplete 
        outlined
          :items="locationsList" 
          v-model="location"
          taggable 
          placeholder="Select or type a location">
        </v-autocomplete>
      </div>

      <div>
        <label for="date">Date:</label>
        <input type="date" v-model="date" />
      </div> -->

      <!-- <div>
        <label for="hour">Hour:</label>
        <select v-model="hour" id="hour">
          <option value="" selected>Select Hour</option>
          <option v-for="h in 23" :key="h" :value="h < 10 ? `0${h}` : h.toString()">
            {{ h < 10 ? `0${h}:00` : `${h}:00` }}
          </option>
        </select> -->
        <!-- <input type="number" v-model="hour" /> -->
      <!-- </div> -->

      <!-- <v-btn type="submit" @click="submitForm">Query</v-btn>
    </form>
    
    <div v-if="response_data.length">
      <h2>Results:</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hour</th>
            <th>Temperature</th> -->
          <!-- </tr>
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
  </div>
</template>

<script>
import axios from "axios" -->
<!-- import { VAutocomplete } from "vuetify/lib";
//import vSelect from "vue-select";

export default {
  components: {
    //VAutocomplete
},
  data() {
    return {
      location: '',
      date: new Date().toISOString().slice(0, 10), // Set default date to current date
      hour: '',
      locationsList: [], // populate this list from your API
      response_data: [], // populate this with the query results from your API
    };
  },
  methods: {
    async fetchLocations() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/available_locations/');
        this.locationsList = response.data.locations;
      } catch (error) {
        console.error('An error occurred while fetching the locations:', error);
      }
    }, 
    async submitForm() {
      console.log("form data:", this.location, this.date, this.hour);
      try {
          // Define the URL of your Django backend endpoint
          const url = 'http://127.0.0.1:8000/api/v1/weather_query/';
          
          // Define the data to be sent in the POST request
          const postData = {
              location: this.location,
              date: this.date,
              hour: this.hour
          }; -->
          
          <!-- // Make a POST request to the Django backend
          const response = await axios.post(url, postData);
          console.log("Response from backend", response);
          
          // Check if the response indicates success
          if (response.data.status == "success") {
              // Update the data in the Vue component with the received data
              this.response_data = response.data.data;
          } else {
              // Handle the case where the backend response indicates an error
              console.error(response.data.message);
          }
      } catch (error) {
          // Handle network errors or other issues with the request
          console.error(error);
      }
    },
  }, 
  created() {
  this.fetchLocations();
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style> -->




<template>
  <div>
    <h1>Weather Query</h1>

 
      <div>
        <label for="location">Location:</label>
        <v-autocomplete
        ref="tt"
        @keydown.enter="show_model"
       
        :search-input.sync="searchInput"
          outlined
          :items="locationsList" 
          v-model="location"
         
          taggable 
          placeholder="Select or type a location"
          >
          <template v-slot:no-data>
            Test
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
          <v-btn>Abbrechen</v-btn>
          <v-btn @click="submitForm">Speichern</v-btn>
        </v-card-actions>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import axios from "axios"
import { VAutocomplete } from "vuetify/lib";
//import vSelect from "vue-select";

export default {
  components: {
    //VAutocomplete
},
  data() {
    return {
      dialog: false,
      searchInput: '',
      location: '',
      date: new Date().toISOString().slice(0, 10), // Set default date to current date
      hour: '',
      locationsList: [], // populate this list from your API
      response_data: [], // populate this with the query results from your API
/*       noDataResult: true */
    };
  },
  methods: {
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
        const response = await axios.get('http://127.0.0.1:8000/api/v1/available_locations/');
        this.locationsList = response.data.locations;
      } catch (error) {
        console.error('An error occurred while fetching the locations:', error);
      }
    }, 
    async submitForm() {
      console.log("form data:", this.location, this.date, this.hour);
      try {
          // Define the URL of your Django backend endpoint
          const url = 'http://127.0.0.1:8000/api/v1/weather_query/';
          
          // Define the data to be sent in the POST request
          const postData = {
              location: this.location,
              date: this.date,
              hour: this.hour
          };
          
          // Make a POST request to the Django backend
          const response = await axios.post(url, postData);
          console.log("Response from backend", response);
          
          // Check if the response indicates success
          if (response.data.status == "success") {
              // Update the data in the Vue component with the received data
              this.response_data = response.data.data;
          } else {
              // Handle the case where the backend response indicates an error
              console.error(response.data.message);
          }
      } catch (error) {
          // Handle network errors or other issues with the request
          console.error(error);
          
      }
    },
    show_model(){
      console.log("----------------------------------------",this.$refs.tt)
      console.log("----------------------------------------",this.searchInput)
      this.location = this.searchInput
      this.dialog = true
    }
  }, 
  created() {
  this.fetchLocations();
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
