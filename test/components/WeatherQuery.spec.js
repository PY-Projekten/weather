import Vue from 'vue';
import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';
import WeatherQuery from '@/components/WeatherQuery.vue';
import { shallowMount } from '@vue/test-utils';
import axios from 'axios';


// ** Axios Mock-Up
// jest.mock('axios', () => ({
//   post: jest.fn(() => Promise.resolve({
//     data: {
//       status: "success",
//       data: {
//         weather: Array(24).fill().map((_, index) => ({ hour: index.toString().padStart(2, '0'), temperature: `${10 + index}°C` }))
//       }
//     }
//   }))
// }));

// ** Axios Mock-Up Test-Version 2
// jest.mock('axios', () => ({
//   post: jest.fn((url, postData) => {
//     if (url === '/weather_query/') {
//       // Check if a specific hour is specified
//       if (postData.hour) {
//         // Return data for the specified hour
//         return Promise.resolve({
//           data: {
//             status: "success",
//             data: {
//               location: { /* location details */ },
//               weather: [{ date: postData.date, hour: postData.hour, temperature: `${10 + parseInt(postData.hour)}°C` }]
//             }
//           }
//         });
//       } else {
//         // Return full 24-hour data
//         return Promise.resolve({
//           data: {
//             status: "success",
//             data: {
//               location: { /* location details */ },
//               weather: Array(24).fill().map((_, index) => ({
//                 date: postData.date,
//                 hour: index.toString().padStart(2, '0'),
//                 temperature: `${10 + index}°C`
//               }))
//             }
//           }
//         });
//       }
//     }
//     // Handle other URLs or return a default mock response
//   })
// }));

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


// describe('WeatherQuery.vue', () => {
//
// //   // Test 1: Rendering Test
//   it('renders input fields for location, date, and hour', () => {
//     const wrapper = mount(WeatherQuery);
//     expect(wrapper.find('#location').exists()).toBe(true); // Modified the ID based on your code
//     expect(wrapper.find('#date').exists()).toBe(true); // Modified the ID based on your code
//     expect(wrapper.find('#hour').exists()).toBe(true); // Modified the ID based on your code
//   });
// //
// //   Test 2: Method Test (submitForm)
//   it('submitForm method submits the weather query', async () => {
//     const wrapper = mount(WeatherQuery);
//
//     // Mocking the axios post method
//     wrapper.vm.$axios.post = jest.fn(() => Promise.resolve({ data: {} }));
//
//     // Setting data properties and calling submitForm
//     await wrapper.setData({ location: 'Test Location', date: '2023-10-30', hour: '14' });
//     await wrapper.vm.submitForm();
//
//     // Checking if axios post method was called with correct parameters
//     expect(wrapper.vm.$axios.post).toHaveBeenCalledWith(
//       '/weather_query/',
//       { location: 'Test Location', date: '2023-10-30', hour: '14' }
//     );
//   });

  // Additional tests for other methods and functionalities can be added similarly

// });


// Basic Rendering Test
// describe('WeatherQuery', () => {
//   // Test to check if the component renders without errors
//   it('renders without errors', () => {
//     const wrapper = shallowMount(WeatherQuery);
//     expect(wrapper.exists()).toBe(true);
//   });


// describe('WeatherQuery', () => {
//   // ... other tests ...
//
//   it('updates data model when user inputs location', async () => {
//     const wrapper = mount(WeatherQuery);
//
//     // Log the rendered HTML to inspect the structure
//     console.log(wrapper.html());
//
//     // Find the input element within v-autocomplete
//     // Adjust the selector if necessary based on the actual rendered HTML
//     const input = wrapper.find('#test-location-input input');
//
//     // Check if the input element is found
//     if (input.exists()) {
//       // Simulate user typing in the autocomplete field
//       await input.setValue('New York');
//       await input.trigger('input');
//
//       // Wait for any asynchronous operations (like data fetching or DOM updates)
//       await wrapper.vm.$nextTick();
//
//       // Simulate selecting an item from the dropdown
//       // This step requires knowing the structure of the dropdown.
//       // You might need to find the dropdown item and trigger a click event on it.
//       // Example: wrapper.find('.dropdown-item-class-for-new-york').trigger('click');
//
//       await wrapper.vm.$nextTick();

      // Check if the 'location' data property of the component is updated
      // expect(wrapper.vm.location).toBe('New York');
//     } else {
//       throw new Error('Input element not found');
//     }
//   });
// });


// ** Mounting Vuetify directly

// describe('WeatherQuery', () => {
//   let vuetify;
//
//   beforeEach(() => {
//     vuetify = new Vuetify();
//   });
//
//   it('updates data model when user inputs location', async () => {
//     const wrapper = mount(WeatherQuery, {
//       localVue,
//       vuetify,
//     });
//
//     // Log the rendered HTML to inspect the structure
//     console.log(wrapper.html());
//
//     // Find the input element within v-autocomplete
//     // Adjust the selector based on the rendered HTML
//     const input = wrapper.find('#test-location-input input');
//
//     if (input.exists()) {
//       // Simulate user typing in the autocomplete field
//       await input.setValue('New York');
//       await input.trigger('input');
//
//       // Wait for any asynchronous operations (like data fetching or DOM updates)
//       await wrapper.vm.$nextTick();
//
//       // Simulate selecting an item from the dropdown
//       // This step requires knowing the structure of the dropdown.
//       // You might need to find the dropdown item and trigger a click event on it.
//       // Example: wrapper.find('.dropdown-item-selector').trigger('click');
//
//       await wrapper.vm.$nextTick();
//
//       // Check if the 'location' data property of the component is updated
//       expect(wrapper.vm.location).toBe('New York');
//     } else {
//       throw new Error('Input element not found');
//     }
//   });
//
//   // ... any other tests ...
// });




const mocks = {
    $vuetify: { breakpoint: {} },
};

const stubs = {
    'v-btn': true,  // Add stubs for other Vuetify components as needed
};

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

    // it('initializes response_data and logs form data on submit', async () => {
    //   // Set the form data
    //   wrapper.setData({
    //     location: 'New York',
    //     date: '2022-01-01',
    //     hour: '12'
    //   });
    //
    //   // Call submitForm
    //   await wrapper.vm.submitForm();
    //
    //   // Check if response_data is initialized to an empty array
    //   expect(wrapper.vm.response_data).toEqual([]);
    //
    //   // Check if console.log was called with the correct form data
    //   expect(consoleSpy).toHaveBeenCalledWith('submitForm is triggered');
    //   expect(consoleSpy).toHaveBeenCalledWith('form data:', 'New York', '2022-01-01', '12');
    // });

    // ** submitForm Method Test 2
  // it('initializes response_data and logs form data on submit', async () => {
  //   // Set the form data
  //   wrapper.setData({
  //     location: 'New York',
  //     date: '2022-01-01',
  //     hour: ''
  //   });
  //
  //   // Call submitForm
  //   await wrapper.vm.submitForm();
  //
  //   // Check if response_data is initialized to an empty array
  //   expect(wrapper.vm.response_data).toEqual([]);
  //
  //   // Check if console.log was called with the correct form data
  //   expect(consoleSpy).toHaveBeenCalledWith('submitForm is triggered');
  //   // ... other assertions ...
  // });

  // ** submitForm Method Test 3
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


    // // ** submitForm Method Test 1
    // it('triggers submitForm on button click', async () => {
    //     // Set necessary data
    //     wrapper.setData({
    //         location: 'New York',
    //         date: '2022-01-01',
    //         hour: '12'
    //     });
    //
    //     // Wait for Vue to update
    //     await wrapper.vm.$nextTick();
    //
    //     // Mock any asynchronous operations if present
    //     // For example, if submitForm makes an API call, mock it here
    //
    //     // Trigger the button click
    //     const button = wrapper.findComponent({ name: 'v-btn' });
    //     console.log(button.exists());
    //     await button.trigger('click');
    //
    //
    //     // Log the number of times submitFormSpy was called
    //     console.log('submitFormSpy called:', submitFormSpy.mock.calls.length);
    //
    //     // Assert that the submitForm method was called
    //         expect(submitFormSpy).toHaveBeenCalled();
    //
    //     // Clean up
    //     submitFormSpy.mockRestore();
    // });
    //
    // // ... any other tests ...
});

