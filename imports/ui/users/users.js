import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Users } from '../../api/users.js';

import './user.js';
import './users.html';

Template.Users.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Session.set('hideCompleted', true);
  Meteor.subscribe('visitors');
});

Template.Users.helpers({
  users() {
    // const instance = Template.instance();
    let hideInactive = Session.get('hideCompleted');
    if (hideInactive) {
      return Users.find({ isActive: { $ne: false} }, { sort: { createdAt: -1 } });
    }else{
      return Users.find();
    }
  },
  activeUserCount() {
    return Users.find({ isActive: { $ne: false } }).count();
  },
  hideCompleted(){
    return Session.get('hideCompleted');
  }
});

Template.Users.events({
  'submit .new-user'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('visitors.insert', text);

    // Clear form
    target.text.value = '';
  },
  'change .hide-inactive input'(event, instance) {
    Session.set('hideCompleted', event.target.checked);
    // instance.state.set('hideCompleted', event.target.checked);
  }
});
