import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Kiosks = new Mongo.Collection('kiosks');

if (Meteor.isServer) {
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('kiosks', function tasksPublication() {
    return Kiosks.find();
  });
  //
  Meteor.publish('foo', function tasksPublication(kioskLabel) {
    return Kiosks.findOne({ label: kioskLabel });
  });
}

Meteor.methods({
  'kiosks.setVisitor'(kioskId, visitorId) {
    check(beaconId, String);
    check(isBeek, Boolean);
    const kiosk = Kiosks.findOne(kioskId);
    // Kiosks.update(beaconId, { $set: { isBeek: isBeek } });
  },
  'kiosks.getData'(kioskLabel) {
    return Kiosks.findOne({ label: kioskLabel });
  }
});
