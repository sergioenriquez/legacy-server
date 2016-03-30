People = new Mongo.Collection("people");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 10);

  Template.beacon.helpers({
    made(){
      return this.date;
    }
  });

  Template.beacon.events({
    'click .delete': function(){
      People.remove(this._id);
    },
    'click .toggle-checked': function () {
      People.update(this._id, {$set: {is_beek: !this.is_beek}});
    }
  });

  ///////////////////////////

  Template.body.helpers({
    counter: function () {
      return People.find().count();
    },
    beacons: function(){
      return People.find();
    },
    foo(){
      return moment(this.date).fromNow();
    }
  });

  Template.body.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },

    'submit .new-beacon': function(event){
      let name = event.target.UUID.value;
      People.insert({
        name: name,
        date: new Date(),
        is_beek: true,
        rssi: 0
      });
      event.target.UUID.value = "";
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
