import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './beacon.html';

Template.beacon.helpers({
  isOwner(){
    return this.owner === Meteor.userId();
  },
  lastSeen(){
    return  moment(this.updatedAt).fromNow();
  }
});

Template.beacon.events({
  'click .toggle-isBeek'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('beacons.setBeek', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('beacons.remove', this._id);
  }
});
