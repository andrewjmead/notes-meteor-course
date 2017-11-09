import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function () {

    it('should show error messages', function () {
      const error = 'This is not working';
      const wrapper = shallow(<Login loginWithPassword={() => { }} />);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function () {
      const email = 'andrew@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = shallow(<Login loginWithPassword={spy} />);

      wrapper.setState({ email, password })
      wrapper.find('form').simulate('submit', { preventDefault: () => { } });

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should set loginWithPassword callback errors', function () {
      const spy = expect.createSpy();
      const wrapper = shallow(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit', { preventDefault: () => { } });

      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error').length).toNotBe(0);

      spy.calls[0].arguments[2]();
      expect(wrapper.state('error').length).toBe(0);
    });

  });
}
