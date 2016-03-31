import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Kiosks } from '../../api/kiosks.js';

import './kiosks.html';

Template.Kiosk.onCreated(function bodyOnCreated() {
  Meteor.subscribe('kiosks');
});

Template.Kiosk.helpers({
  kiosks() {
    return Kiosks.find();
  },
  getData(label) {
    return Kiosks.find();
  }
});
