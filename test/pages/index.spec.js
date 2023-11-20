import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import IndexPage from '~/pages/index.vue';
import WeatherQueryVue from '@/components/WeatherQueryOne.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('IndexPage', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  test('passes correct props to WeatherQueryVue', () => {
    const wrapper = mount(IndexPage, {
      localVue,
      vuetify,
    });

    const weatherQueryVueWrapper = wrapper.findComponent(WeatherQueryVue);

    // Check if the test prop is correctly passed
    expect(weatherQueryVueWrapper.props('test')).toBe(wrapper.vm.test);

    // Check if the set_test method is correctly passed
    expect(weatherQueryVueWrapper.props('set_test')).toBe(wrapper.vm.set_test);
  });
});

