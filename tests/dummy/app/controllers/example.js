import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    clicked() {
      window.alert("clicked");
    }
  }
});