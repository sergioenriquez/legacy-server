import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = new Mongo.Collection('visitors');

if (Meteor.isServer) {
  Meteor.publish('visitors', function tasksPublication() {
    return Users.find();
  });
}

Meteor.methods({
  'visitors.insert'(name) {
    check(name, String);
    Users.insert({
      name: name,
      createdAt: new Date(),
      language: "English",
      demoUrl: "https://en.wikipedia.org/wiki/San_Diego",
      beacon: null,
      isActive: true
    });
  },
  'visitors.remove'(userId) {
    check(userId, String);
    const user = Users.findOne(userId);
    Users.remove(user);
  },
  'visitors.setActive'(userId, isActive) {
    check(userId, String);
    check(isActive, Boolean);
    const user = Users.findOne(userId);
    Users.update(userId, { $set: { isActive: isActive } });
  }
});
