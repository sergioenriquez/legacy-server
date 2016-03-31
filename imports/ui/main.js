import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import './users/users.js';
import './beacons/beacons.js';
import './kiosks/kiosks.js';

Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'My Title'}});
});

Router.route('/users');

Router.route('/beacons');

////////

import { Kiosks } from '../api/kiosks.js';

Router.route('/kiosks/:kioskLabel', {
  template: 'Kiosk',
  data: function(){
    return Kiosks.findOne({ label: this.params.kioskLabel });
  }
});

/**************************************************/

Template.Home.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.Home.helpers({
  counter() {
    return Template.instance().counter.get();
  }
});

Template.Home.events({
  'click button'(event, instance) {
    instance.counter.set(instance.counter.get() + 1);
  },
});
