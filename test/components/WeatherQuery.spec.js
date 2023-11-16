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


describe('WeatherQuery', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('updates data model when user inputs location', async () => {
    const wrapper = mount(WeatherQuery, {
      localVue,
      vuetify,
    });

    // Log the rendered HTML to inspect the structure
    console.log(wrapper.html());

    // Find the input element within v-autocomplete
    // Adjust the selector based on the rendered HTML
    const input = wrapper.find('#test-location-input input');

    if (input.exists()) {
      // Simulate user typing in the autocomplete field
      await input.setValue('New York');
      await input.trigger('input');

      // Wait for any asynchronous operations (like data fetching or DOM updates)
      await wrapper.vm.$nextTick();

      // Simulate selecting an item from the dropdown
      // This step requires knowing the structure of the dropdown.
      // You might need to find the dropdown item and trigger a click event on it.
      // Example: wrapper.find('.dropdown-item-selector').trigger('click');

      await wrapper.vm.$nextTick();

      // Check if the 'location' data property of the component is updated
      expect(wrapper.vm.location).toBe('New York');
    } else {
      throw new Error('Input element not found');
    }
  });

  // ... any other tests ...
});




