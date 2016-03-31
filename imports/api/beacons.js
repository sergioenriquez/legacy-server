import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Beacons = new Mongo.Collection('beacons');

if (Meteor.isServer) {
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('beacons', function tasksPublication() {
    return Beacons.find();
  });
}

Meteor.methods({
  'beacons.insert'(beaconName) {
    check(beaconName, String);
    Beacons.insert({
      name: beaconName,
      createdAt: new Date(),
      mac: "NA",
      uuid: "NA",
      isBeek: true,
      rssi: 0
    });
  },
  'beacons.remove'(beaconId) {
    check(beaconId, String);
    Beacons.remove(beaconId);
  },
  'beacons.setBeek'(beaconId, isBeek) {
    check(beaconId, String);
    check(isBeek, Boolean);
    const beacon = Beacons.findOne(beaconId);
    Beacons.update(beaconId, { $set: { isBeek: isBeek } });
  },
  'beacons.test'(beaconId) {
    return {label: 'bob', message: beaconId};
  }
});
