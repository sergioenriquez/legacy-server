import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import './users/users.js';
import './beacons/beacons.js';

Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'My Title'}});
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/users');

// when you navigate to "/two" automatically render the template named "Two".
Router.route('/beacons');

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
