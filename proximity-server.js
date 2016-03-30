People = new Mongo.Collection("people");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 10);

  Template.main.helpers({
    counter: function () {
      return Session.get('counter');
    },
    people: function(){
      return People.find();
    },
    foo(){
      return moment(this.date).fromNow();
    }
  });

  Template.main.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
