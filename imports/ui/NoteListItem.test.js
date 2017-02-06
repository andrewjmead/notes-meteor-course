import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render title and timestamp', function () {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/> );

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('2/03/17');
    });

    it('should set default title if no title set', function () {
      const wrapper = mount( <NoteListItem note={notes[1]} Session={Session}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

    it('should call set on click', function () {
      const wrapper = mount( <NoteListItem note={notes[0]} Session={Session}/> );

      wrapper.find('div').simulate('click');

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

  });
}
