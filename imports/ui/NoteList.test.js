import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { notes } from '../fixtures/fixtures';
import { NoteList } from './NoteList';

if (Meteor.isClient) {
  describe('NoteList', function () {

    it('should render NoteListItem for each note', function () {
      const wrapper = mount(<NoteList notes={notes}/>);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', function () {
      const wrapper = mount(<NoteList notes={[]}/>);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });

  });
}
