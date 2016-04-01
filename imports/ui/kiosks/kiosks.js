import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Kiosks } from '../../api/kiosks.js';
import { Users } from '../../api/users.js';

import './kiosks.html';

Template.Kiosk.onCreated(function bodyOnCreated() {
  Meteor.subscribe('kiosks');
  Meteor.subscribe('visitors');
});

Template.Kiosk.helpers({
  username(){
    let visitorData = Users.findOne({_id: this.userInFocus});
    if (visitorData == null){
      return null;
    }
    return visitorData.name;
  },
  message(){
    let visitorData = Users.findOne({_id: this.userInFocus});
    if (visitorData == null){
      return null;
    }
    return visitorData.customGreeting;
  },
  greeting(){
    let visitorData = Users.findOne({_id: this.userInFocus});
    if (visitorData == null){
      return null;
    }
    return visitorData.language;
  },
  userContentUrl(){
    let visitorData = Users.findOne({_id: this.userInFocus});
    if (visitorData == null){
      return null;
    }
    return visitorData.demoUrl;
  }
});
