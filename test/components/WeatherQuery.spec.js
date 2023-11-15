import Vue from 'vue';
import { mount } from '@vue/test-utils';
import WeatherQuery from '@/components/WeatherQuery.vue';

import { shallowMount } from '@vue/test-utils';


// describe('WeatherQuery.vue', () => {

//   // Test 1: Rendering Test
//   it('renders input fields for location, date, and hour', () => {
//     const wrapper = mount(WeatherQuery);
//     expect(wrapper.find('#location').exists()).toBe(true); // Modified the ID based on your code
//     expect(wrapper.find('#date').exists()).toBe(true); // Modified the ID based on your code
//     expect(wrapper.find('#hour').exists()).toBe(true); // Modified the ID based on your code
//   });
//
//   // Test 2: Method Test (submitForm)
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
//
//   // Additional tests for other methods and functionalities can be added similarly
//
// });




describe('WeatherQuery', () => {
  it('renders without errors', () => {
    const wrapper = shallowMount(WeatherQuery);
    expect(wrapper.exists()).toBe(true);
  });

  // Example: Test input field for location
  it('updates data model when user inputs location', async () => {
    const wrapper = shallowMount(WeatherQuery);
    const input = wrapper.find('input#location');
    await input.setValue('New York');
    expect(wrapper.vm.location).toBe('New York');
  });
});



