Beacons = new Mongo.Collection("beacons");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 10);

  Template.beacon.helpers({
    made(){
      return this.date;
    },
    created(){
      return this.created.toISOString();
    },
    lastSeen(){
      if(!this.updated){
        return null;
      }
      return moment(this.updated).fromNow();
    }
  });

  Template.beacon.events({
    'click .delete': function(){
      Beacons.remove(this._id);
    },
    'click .toggle-checked': function () {
      Beacons.update(this._id, {$set: {is_beek: !this.is_beek}});
    }
  });

  ///////////////////////////

  Template.body.helpers({
    counter: function () {
      return Beacons.find().count();
    },
    beacons: function(){
      return Beacons.find();
    },
    foo(){
      return moment(this.updated).fromNow();
    }
  });

  Template.body.events({
    'click button-primary': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },

    'submit .form-inline': function(event){
      let name = event.target.name.value;
      let mac = event.target.MAC.value;
      let uuid = event.target.UUID.value;
      Beacons.insert({
        name: name,
        mac: mac,
        uuid: uuid,
        created: new Date(),
        updated: null,
        is_beek: true,
        rssi: 0
      });
      event.target.name.value = "";
      event.target.mac.value = "";
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
