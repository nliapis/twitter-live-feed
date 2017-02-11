import { mount } from 'enzyme';
import React from 'react';
import Form from '../src/Form';

describe('Form', () => {
  let wrapper;

  describe('when prop `inputValue` is empty', () => {
    beforeEach(() => {
      wrapper = mount(
        <Form
          disabledButton={true}
        />
      );
    });

    it('should display search button disabled', () => {
      expect(wrapper.find('.btn-disabled').length).toBe(1);
    });

  });

  describe('when prop `inputValue` is not empty', () => {
    beforeEach(() => {
      wrapper = mount(
        <Form
          disabledButton={false}
        />
      );
      wrapper.simulate('change', { target: { value: 'london' } })
    });

    it('should display search button disabled', () => {
      expect(wrapper.find('.btn-disabled').length).toBe(0);
    });
  });

});
