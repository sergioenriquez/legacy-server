import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Beacons } from '../../api/beacons.js';

import './beacon.js';
import './beacons.html';

Template.Beacons.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('beacons');
});

Template.Beacons.helpers({
  beacons() {
    return Beacons.find({}, { sort: { rssi: -1 } });
  },
  beaconCount() {
    return Beacons.find().count();
  }
});

Template.Beacons.events({
  'submit .new-beacon'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('beacons.insert', text);

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  }
});
