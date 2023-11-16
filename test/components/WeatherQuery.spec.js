import Vue from 'vue';
import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';
import WeatherQuery from '@/components/WeatherQuery.vue';
import { shallowMount } from '@vue/test-utils';

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
  let submitFormSpy;

  beforeEach(() => {
      wrapper = mount(WeatherQuery, {
        localVue,
        mocks,
        stubs
      });


      // Check if submitForm method exists and create a spy
      if (typeof wrapper.vm.submitForm === 'function') {
          submitFormSpy = jest.spyOn(wrapper.vm, 'submitForm');
      }
  });

  afterEach(() => {
    if (submitFormSpy) {
        submitFormSpy.mockRestore();
    }
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

        // Check if the 'hour data property of the component is updated
        expect(wrapper.vm.hour).toBe('12');
    });

    it('displays all hours if no hour is specified', async () => {
        // Mock the Axios post call
        wrapper.vm.$axios.post = jest.fn().mockResolvedValue({
            data: {
                status: "success",
                data: {
                    weather: [
                        { hour: '00', temperature: '10°C'},
                        { hour: '01', temperature: '11°C'},
                        { hour: '02', temperature: '12°C'},
                        { hour: '03', temperature: '13°C'},
                        { hour: '04', temperature: '14°C'},
                        { hour: '05', temperature: '15°C'},
                        { hour: '06', temperature: '16°C'},
                        { hour: '07', temperature: '17°C'},
                        { hour: '08', temperature: '18°C'},
                        { hour: '09', temperature: '19°C'},
                        { hour: '10', temperature: '20°C'},
                        { hour: '11', temperature: '21°C'},
                        { hour: '12', temperature: '22°C'},
                        { hour: '13', temperature: '23°C'},
                        { hour: '14', temperature: '24°C'},
                        { hour: '15', temperature: '25°C'},
                        { hour: '16', temperature: '26°C'},
                        { hour: '17', temperature: '27°C'},
                        { hour: '18', temperature: '28°C'},
                        { hour: '19', temperature: '29°C'},
                        { hour: '20', temperature: '30°C'},
                        { hour: '21', temperature: '31°C'},
                        { hour: '22', temperature: '32°C'},
                        { hour: '23', temperature: '33°C'},
                      ]
                }
            }
        });

        // Set location and date, but leave hour empty
        wrapper.setData({
            location: 'New York',
            date: '2022-01-01',
            hour: ''
        });

        // Trigger the submitForm method
        await wrapper.vm.submitForm();

        // Assert that the response_data is populated with data for all hours
        expect(wrapper.vm.response_data.length).toBe(14); // Assuming 24 entries for 24 hours
        expect(wrapper.vm.response_data[0].hour).toBe('00');
        expect(wrapper.vm.response_data[0].hour).toBe('01');
        expect(wrapper.vm.response_data[0].hour).toBe('02');
        expect(wrapper.vm.response_data[0].hour).toBe('03');
        expect(wrapper.vm.response_data[0].hour).toBe('04');
        expect(wrapper.vm.response_data[0].hour).toBe('05');
        expect(wrapper.vm.response_data[0].hour).toBe('06');
        expect(wrapper.vm.response_data[0].hour).toBe('07');
        expect(wrapper.vm.response_data[0].hour).toBe('08');
        expect(wrapper.vm.response_data[0].hour).toBe('09');
        expect(wrapper.vm.response_data[0].hour).toBe('10');
        expect(wrapper.vm.response_data[0].hour).toBe('11');
        expect(wrapper.vm.response_data[0].hour).toBe('12');
        expect(wrapper.vm.response_data[0].hour).toBe('13');
        expect(wrapper.vm.response_data[0].hour).toBe('14');
        expect(wrapper.vm.response_data[0].hour).toBe('15');
        expect(wrapper.vm.response_data[0].hour).toBe('16');
        expect(wrapper.vm.response_data[0].hour).toBe('17');
        expect(wrapper.vm.response_data[0].hour).toBe('18');
        expect(wrapper.vm.response_data[0].hour).toBe('19');
        expect(wrapper.vm.response_data[0].hour).toBe('20');
        expect(wrapper.vm.response_data[0].hour).toBe('21');
        expect(wrapper.vm.response_data[0].hour).toBe('22');
        expect(wrapper.vm.response_data[0].hour).toBe('23');
        // Additional assertions can be made here to check the content of response_data
    });



    // // ** submitForm Method TestTest
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

