import Vue from 'vue';
import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';
import WeatherQuery from '@/components/WeatherQueryOne.vue';
import { shallowMount } from '@vue/test-utils';
import axios from 'axios';



// ** Axios Mock-Up Test-Version 3
jest.mock('axios', () => ({
  post: jest.fn((url, postData) => {
    const mockLocation = {
      id: 1, // Example ID
      latitude: "44.41", // Example latitude
      longitude: "8.93", // Example longitude
      name: "genoa" // Example location name
    };

    if (url === '/weather_query/') {
      if (postData.hour) {
        return Promise.resolve({
          data: {
            status: "success",
            data: {
              location: mockLocation,
              weather: [{ date: postData.date, hour: postData.hour, temperature: `${10 + parseInt(postData.hour)}°C` }]
            }
          }
        });
      } else {
        return Promise.resolve({
          data: {
            status: "success",
            data: {
              location: mockLocation,
              weather: Array(24).fill().map((_, index) => ({
                date: postData.date,
                hour: index.toString().padStart(2, '0'),
                temperature: `${10 + index}°C`
              }))
            }
          }
        });
      }
    }
    // Handle other URLs or return a default mock response
  })
}));


const localVue = createLocalVue();
localVue.use(Vuetify);


const mocks = {
    $vuetify: { breakpoint: {} },
};
const stubs = {
    'v-btn': true,  // Add stubs for other Vuetify components as needed
};

// ******************************
// **** Method: submitForm() ****
// ******************************


// *** Set Up ***
// **************

describe('WeatherQuery', () => {
  let wrapper;
  let consoleSpy

  beforeEach(() => {
      wrapper = mount(WeatherQuery, {
        localVue,
        mocks: {
            $axios: axios
        },
        stubs: ['v-btn']
      });
      consoleSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // *** Test to check if the component renders without errors ***
    it('renders without errors', () => {
      const wrapper = shallowMount(WeatherQuery);
      expect(wrapper.exists()).toBe(true);
    });

    // *** Testing Modular Input Fields ***
    // ***********************************
    it('updates data model when user inputs location', async () => {
        // Directly set the value of 'location' and check the reaction of the component
        wrapper.setData({ location: 'New York'});
        // Wait for Vue to update
        await wrapper.vm.$nextTick();
        // Check if the 'location data property of the component is updated
        expect(wrapper.vm.location).toBe('New York');
    });

    it('updates data model when user inputs date', async () => {
        // Directly set the value of 'date' and check the reaction of the component
        wrapper.setData({ date: '2022-01-01'});
        // Wait for Vue to update
        await wrapper.vm.$nextTick();
        // Check if the 'date data property of the component is updated
        expect(wrapper.vm.date).toBe('2022-01-01');
    });

    it('updates data model when user inputs hour', async () => {
        // Directly set the value of 'hour' and check the reaction of the component
        wrapper.setData({ hour: '12'});
        // Wait for Vue to update
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.hour).toBe('12');
    });

    it('displays all hours if no hour is specified', async () => {
        // Set location and date, but leave hour empty
        wrapper.setData({
            location: 'New York',
            date: '2022-01-01',
            hour: ''
        });

        // Trigger the submitForm method
        await wrapper.vm.$nextTick();
        await wrapper.vm.submitForm();

        // Assert that the response_data is populated with data for all hours
        console.log(wrapper.vm.response_data, wrapper.vm.errorMessage)
        expect(wrapper.vm.response_data.length).toBe(24); // Assuming 24 entries for 24 hours
        expect(wrapper.vm.response_data[0].hour).toBe('00');
        expect(wrapper.vm.response_data[1].hour).toBe('01');
        expect(wrapper.vm.response_data[2].hour).toBe('02');
        expect(wrapper.vm.response_data[3].hour).toBe('03');
        expect(wrapper.vm.response_data[4].hour).toBe('04');
        expect(wrapper.vm.response_data[5].hour).toBe('05');
        expect(wrapper.vm.response_data[6].hour).toBe('06');
        expect(wrapper.vm.response_data[7].hour).toBe('07');
        expect(wrapper.vm.response_data[8].hour).toBe('08');
        expect(wrapper.vm.response_data[9].hour).toBe('09');
        expect(wrapper.vm.response_data[10].hour).toBe('10');
        expect(wrapper.vm.response_data[11].hour).toBe('11');
        expect(wrapper.vm.response_data[12].hour).toBe('12');
        expect(wrapper.vm.response_data[13].hour).toBe('13');
        expect(wrapper.vm.response_data[14].hour).toBe('14');
        expect(wrapper.vm.response_data[15].hour).toBe('15');
        expect(wrapper.vm.response_data[16].hour).toBe('16');
        expect(wrapper.vm.response_data[17].hour).toBe('17');
        expect(wrapper.vm.response_data[18].hour).toBe('18');
        expect(wrapper.vm.response_data[19].hour).toBe('19');
        expect(wrapper.vm.response_data[20].hour).toBe('20');
        expect(wrapper.vm.response_data[21].hour).toBe('21');
        expect(wrapper.vm.response_data[22].hour).toBe('22');
        expect(wrapper.vm.response_data[23].hour).toBe('23');
        // Check if the 'hour data property of the component is updated
        // expect(wrapper.vm.hour).toBe('12');
    });
        // Additional assertions can be made here to check the content of response_data


  // *** submitForm response_data trigger ***
  it('initializes response_data and logs form data on submit', async () => {
    // Adjust the mock for this test
    axios.post.mockImplementationOnce(() => Promise.resolve({ data: { status: "success", data: { weather: [] } } }));

    // Ensure response_data is initially empty
    expect(wrapper.vm.response_data).toEqual([]);

    // Call submitForm and wait for it to complete
    await wrapper.vm.submitForm();

    // Now check if response_data is still empty after submitForm
    expect(wrapper.vm.response_data).toEqual([]);

    // ... other assertions ...
  });

  // *** Testing Form Data Preparation ***
  it('prepares and sends correct form data on submit', async () => {
    // Set component data properties
    wrapper.setData({
      location: 'TestLocation',
      date: '2023-11-13',
      hour: '10' });

    // Spy on axios.post
    const postSpy = jest.spyOn(axios, 'post');

    // Trigger submitForm
    await wrapper.vm.submitForm();

    // Assert that axios.post was called with correct data
    expect(postSpy).toHaveBeenCalledWith('/weather_query/', {
      location: 'TestLocation',
      date: '2023-11-13',
      hour: '10'
    });
  });

  // *** Testing Successful Data Retrieval ***
  it('updates response_data on successful data retrieval', async () => {
    // Mock Axios POST to return a successful response
    axios.post.mockResolvedValue ({
      data: {
        status: "success",
        data: {
          weather: [{ date: "2023-11-13", hour: "10", temperature: 14.9 }]
        }
      }
    });

    // Trigger submitForm
    await wrapper.vm.submitForm();

    // Assert that response_data is updated correctly
    expect(wrapper.vm.response_data).toEqual([{ date: "2023-11-13", hour: "10", temperature: 14.9 }]);
  });

  // **Test Backend Error Handling:**
  // ********************************

  it('handles backend error correctly', async () => {
    // Mock axios.post to simulate a backend error
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Backend error occurred' } }
    });

    // Trigger submitForm
    await wrapper.vm.submitForm();

    // Assert that errorMessage is updated correctly
    expect(wrapper.vm.errorMessage).toBe('Backend error occurred');
  });

  it('handles network error correctly', async () => {
    // Mock axios.post to simulate a network error
    axios.post.mockRejectedValueOnce({ request: {} });

    // Trigger submitForm
    await wrapper.vm.submitForm();

    // Assert that errorMessage is updated correctly
    expect(wrapper.vm.errorMessage).toBe('No response from the server');
  });

  it('handles request setup error correctly', async () => {
    // Mock axios.post to simulate a request setup error
    axios.post.mockRejectedValueOnce(new Error('Request setup failed'));

    // Trigger submitForm
    await wrapper.vm.submitForm();

    // Assert that errorMessage is updated correctly
    expect(wrapper.vm.errorMessage).toBe('Error setting up the request');
  });

  // *** Edge Cases: ***
  // ********************************

  // it('does not submit form with invalid location', async () => {
  //   // Set component data with a location not in the locationsList
  //   wrapper.setData({
  //     location: 'InvalidLocation',
  //     date: '2023-11-13',
  //     hour: '10'
  //   });
  //
  //   // Spy on axios.post to check if it gets called
  //   const postSpy = jest.spyOn(axios, 'post');
  //
  //   // Trigger submitForm
  //   await wrapper.vm.submitForm();
  //
  //   // Assert that axios.post was not called due to invalid location
  //   expect(postSpy).not.toHaveBeenCalled();
  // });


  // Mock any asynchronous operations if present
  // For example, if submitForm makes an API call, mock it here
});

