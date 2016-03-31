import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './user.html';

Template.user.helpers({
  isOwner(){
    return this.owner === Meteor.userId();
  },
  lastSeen(){
    return moment(this.createdAt).fromNow();
  },
  created(){
    return this.createdAt.toISOString();
  }
});

Template.user.events({
  'click .toggle-inactive'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('visitors.setActive', this._id, !this.isActive);
  },
  'click .delete'() {
    Meteor.call('visitors.remove', this._id);
  }
});
