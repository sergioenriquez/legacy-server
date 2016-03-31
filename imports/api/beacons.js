import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Beacons = new Mongo.Collection('beacons');

if (Meteor.isServer) {
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('beacons', function tasksPublication() {
    return Beacons.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId }
      ]
    });
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
  'beacons.remove'(taskId) {
    check(taskId, String);

    const task = Beacons.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Beacons.remove(taskId);
  },
  'beacons.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Beacons.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Beacons.update(taskId, { $set: { checked: setChecked } });
  },
  'beacons.setBeek'(taskId, isBeek) {
    check(taskId, String);
    check(isBeek, Boolean);
    const beacon = Beacons.findOne(taskId);
    Beacons.update(taskId, { $set: { isBeek: isBeek } });
  }
});
